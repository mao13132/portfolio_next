import { SocialMediaProps } from "./SocialMedia.props";
import styles from './SocialMedia.module.css';

export const SocialMedia = ({ className, ...props }: SocialMediaProps): JSX.Element => {
    return (
        <div className={styles['social-media']} {...props}>

            <a href="https://t.me/developer_telegrams"><i className='bx bxl-telegram'></i></a>
            <a href="https://vk.com/dembels"><i className='bx bxl-vk' ></i></a>

        </div>
    );
};
