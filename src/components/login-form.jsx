import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LoaderCircle, Shield, User } from "lucide-react";
import iconImage from '@/assets/icon.jpeg';
export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem("user", data.name);
      localStorage.setItem('role', data.role);

      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center p-4", className)} {...props}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full opacity-30"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400 rounded-full mb-4 shadow-lg overflow-hidden">
              <img
                  src={iconImage}
                  alt="Kapil Agro Icon"
                  className="w-fit h-fit object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Please sign in to your admin account</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl font-semibold text-center text-gray-900 flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Admin Login
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-6"
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={loading}
                      placeholder="admin@company.com"
                      required
                      className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={loading}
                      placeholder="Enter your password"
                      required
                      className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="text-red-600 text-sm font-medium">
                          {errorMessage}
                        </div>
                      </div>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                  {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                        Signing In...
                      </>
                  ) : (
                      'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
            </p>
          </div>
        </div>
      </div>
  );
}