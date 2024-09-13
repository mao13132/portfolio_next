import { SocialMediaProps } from "./SocialMedia.props";
import styles from './SocialMedia.module.css';

export const SocialMedia = ({ className, ...props }: SocialMediaProps): JSX.Element => {
    return (
        <div className={styles['social-media']} {...props}>

            <a href="#"><i className='bx bxl-telegram'></i></a>
            <a href="#"><i className='bx bxl-vk' ></i></a>
            <a href="#"><i className='bx bxl-tiktok' ></i></a>
            <a href="#"><i className='bx bxl-reddit' ></i></a>

        </div>
    );
};
