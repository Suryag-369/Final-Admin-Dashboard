import { Moon, Sun } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        height: '40px',
                        width: '40px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        outline: 'none'
                    }}
                    aria-label="Toggle theme"
                >
                    <Sun 
                        style={{ 
                            height: '1.2rem', 
                            width: '1.2rem',
                            transform: 'scale(1) rotate(0deg)',
                            transition: 'all 0.2s'
                        }} 
                        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" 
                    />
                    <Moon 
                        style={{ 
                            position: 'absolute',
                            height: '1.2rem', 
                            width: '1.2rem',
                            transform: 'scale(0) rotate(90deg)',
                            transition: 'all 0.2s'
                        }} 
                        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" 
                    />
                </button>
            </DropdownMenu.Trigger>
            
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '4px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        minWidth: '120px'
                    }}
                    sideOffset={5}
                >
                    <DropdownMenu.Item
                        onSelect={() => setTheme("light")}
                        style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none',
                            backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Light
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onSelect={() => setTheme("dark")}
                        style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none',
                            backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        Dark
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onSelect={() => setTheme("system")}
                        style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontSize: '14px',
                            outline: 'none',
                            backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        System
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}