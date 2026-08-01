import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SITE_URL = 'https://dima-razrab.com';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
};

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Страница не найдена (404) | DimaRazrab</title>
                <meta name="description" content="Запрашиваемая страница не найдена. Перейдите на главную страницу или посмотрите мои услуги и портфолио." />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href={`${SITE_URL}/404`} />
            </Head>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)',
                color: '#e0e0e0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                padding: '20px',
                textAlign: 'center',
            }}>
                {/* Particles background effect */}
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                                background: `rgba(0, 200, 255, ${Math.random() * 0.3 + 0.1})`,
                                borderRadius: '50%',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    {/* Logo */}
                    <Link href="/" style={{
                        textDecoration: 'none',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#fff',
                        display: 'block',
                        marginBottom: '60px',
                    }}>
                        <span style={{ color: '#00c8ff' }}>D</span>imaRazrab
                    </Link>

                    {/* 404 number */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{
                            fontSize: 'clamp(100px, 20vw, 200px)',
                            fontWeight: 900,
                            margin: 0,
                            background: 'linear-gradient(135deg, #00c8ff 0%, #7b2ff7 50%, #ff6b6b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1,
                            letterSpacing: '-5px',
                        }}
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            fontSize: '24px',
                            fontWeight: 600,
                            margin: '20px 0 10px',
                            color: '#fff',
                        }}
                    >
                        Страница не найдена
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{
                            fontSize: '16px',
                            color: '#888',
                            maxWidth: '400px',
                            margin: '0 auto 40px',
                            lineHeight: 1.6,
                        }}
                    >
                        Возможно, страница была удалена или вы перешли по неверной ссылке.
                    </motion.p>

                    {/* Navigation links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 32px',
                                background: 'linear-gradient(135deg, #00c8ff 0%, #7b2ff7 100%)',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '16px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                        >
                            ← На главную
                        </Link>

                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: '8px',
                        }}>
                            <Link
                                href="/razrabotka-botov"
                                style={{
                                    color: '#00c8ff',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    padding: '8px 16px',
                                    border: '1px solid rgba(0, 200, 255, 0.3)',
                                    borderRadius: '8px',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                Разработка ботов
                            </Link>
                            <Link
                                href="/razrabotka-crm"
                                style={{
                                    color: '#00c8ff',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    padding: '8px 16px',
                                    border: '1px solid rgba(0, 200, 255, 0.3)',
                                    borderRadius: '8px',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                Разработка CRM
                            </Link>
                            <Link
                                href="/razrabotka-servisov"
                                style={{
                                    color: '#00c8ff',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    padding: '8px 16px',
                                    border: '1px solid rgba(0, 200, 255, 0.3)',
                                    borderRadius: '8px',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                Разработка сервисов
                            </Link>
                            <Link
                                href="/blog"
                                style={{
                                    color: '#00c8ff',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    padding: '8px 16px',
                                    border: '1px solid rgba(0, 200, 255, 0.3)',
                                    borderRadius: '8px',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                Блог
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                <style jsx>{`
                    @keyframes float {
                        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
                    }
                `}</style>
            </div>
        </>
    );
}
