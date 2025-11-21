import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CreditCard, Lock } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName?: string;
    amount?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, planName = "Premium Plan", amount = "₦3,000" }) => {
    const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        // Simulate payment processing
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    const resetAndClose = () => {
        setStep('details');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetAndClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '450px',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            zIndex: 1001,
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        <button
                            onClick={resetAndClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={24} />
                        </button>

                        {step === 'details' && (
                            <form onSubmit={handlePayment}>
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Complete Purchase</h2>
                                    <p style={{ color: 'var(--color-text-muted)' }}>You are subscribing to <strong style={{ color: 'var(--color-primary)' }}>{planName}</strong></p>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{amount}<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>/mo</span></div>
                                </div>

                                <div className="flex flex-col gap-md">
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Card Number</label>
                                        <div style={{ position: 'relative' }}>
                                            <CreditCard size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem 1rem 0.75rem 3rem',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--color-border)',
                                                    background: 'var(--color-bg)',
                                                    color: '#fff',
                                                    outline: 'none'
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-md">
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Expiry</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--color-border)',
                                                    background: 'var(--color-bg)',
                                                    color: '#fff',
                                                    outline: 'none'
                                                }}
                                                required
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>CVC</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--color-border)',
                                                    background: 'var(--color-bg)',
                                                    color: '#fff',
                                                    outline: 'none'
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}
                                    >
                                        Pay {amount}
                                    </button>

                                    <div className="flex justify-center items-center gap-xs" style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                        <Lock size={12} /> Secured by Paystack
                                    </div>
                                </div>
                            </form>
                        )}

                        {step === 'processing' && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        border: '4px solid var(--color-border)',
                                        borderTop: '4px solid var(--color-primary)',
                                        borderRadius: '50%',
                                        margin: '0 auto 2rem'
                                    }}
                                />
                                <h3>Processing Payment...</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>Please do not close this window.</p>
                            </div>
                        )}

                        {step === 'success' && (
                            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'var(--color-success)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        color: '#000'
                                    }}
                                >
                                    <Check size={40} strokeWidth={3} />
                                </motion.div>
                                <h2 style={{ marginBottom: '0.5rem' }}>Payment Successful!</h2>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Welcome to Exolorer Premium.</p>
                                <button onClick={resetAndClose} className="btn btn-outline w-full">Continue to App</button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
