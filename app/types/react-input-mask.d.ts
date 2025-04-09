declare module 'react-input-mask' {
    import { Component } from 'react';
    
    interface InputMaskProps {
        mask: string;
        value?: string;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
        placeholder?: string;
        className?: string;
    }
    
    export default class InputMask extends Component<InputMaskProps> {}
} 