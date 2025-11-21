import React, { useState } from 'react';

import { Mail, Lock, User, ArrowRight, Facebook } from 'lucide-react';
import authHero from '../assets/auth-hero.png';
import { Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page" style={{
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: 'var(--color-bg)'
        }}>
            {/* Image Side (Hidden on mobile) */}
            <div className="hidden-mobile" style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${authHero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(15, 23, 42, 0.1), var(--color-bg))',
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    maxWidth: '400px',
                    zIndex: 10
                }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
                        {isLogin ? "Welcome Back to Lagos." : "Start Your Journey."}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
                        Join thousands of solo travelers exploring the city safely and authentically.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </h1>
                        <p className="text-muted">
                            {isLogin ? 'Enter your details to access your account' : 'Get started with your free account'}
                        </p>
                    </div>

                    <form className="flex flex-col gap-md">
                        {!isLogin && (
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 3rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            background: 'var(--color-bg-card)',
                                            color: 'var(--color-text)',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="email"
                                    placeholder="hello@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-bg-card)',
                                        color: 'var(--color-text)',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-bg-card)',
                                        color: 'var(--color-text)',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                            {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </form>

                    <div className="text-center" style={{ margin: '2rem 0', position: 'relative' }}>
                        <hr style={{ borderColor: 'var(--color-border)' }} />
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'var(--color-bg)',
                            padding: '0 1rem',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.9rem'
                        }}>
                            Or continue with
                        </span>
                    </div>

                    <div className="flex gap-md">
                        <button className="btn btn-outline w-full">
                            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '20px', marginRight: '0.5rem' }} /> Google
                        </button>
                        <button className="btn btn-outline w-full">
                            <Facebook size={20} style={{ marginRight: '0.5rem', color: '#1877F2' }} /> Facebook
                        </button>
                    </div>

                    <p className="text-center text-muted" style={{ marginTop: '2rem' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                background: 'none',
                                color: 'var(--color-primary)',
                                fontWeight: '600',
                                textDecoration: 'underline'
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>

                    <div className="text-center" style={{ marginTop: '2rem' }}>
                        <Link to="/" className="text-muted hover:text-primary" style={{ fontSize: '0.9rem' }}>
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
