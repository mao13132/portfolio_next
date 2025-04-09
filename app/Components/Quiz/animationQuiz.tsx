// Анимация для появления вопроса
export const questionAnimation = {
    hidden: {
        x: -100,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}

// Анимация для вариантов ответа
export const optionsAnimation = {
    hidden: {
        y: 50,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: custom * 0.1,
            duration: 0.3
        }
    })
}

// Анимация для формы телефона
export const phoneFormAnimation = {
    hidden: {
        scale: 0.8,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
        }
    }
}

// Анимация для сообщения об успешной отправке
export const successMessageAnimation = {
    hidden: {
        y: -20,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
} 