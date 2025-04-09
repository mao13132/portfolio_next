import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './Quiz.module.css';
import cn from 'classnames';

interface QuizButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string;
}

export const QuizButton = ({ text, className, ...props }: QuizButtonProps): JSX.Element => {
    return (
        <button className={cn(styles['quiz-button'], className)} {...props}>
            {text}
        </button>
    );
}; 