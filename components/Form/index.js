import React, { useState } from 'react';
import SignIn from './SignIn';
import PassRecovery from './PassRecovery';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';

const Form = () => {
    const router = useRouter();
    const [recovery, setRecovery] = useState(false);
    const [email, setEmail] = useState();
    const { t } = useTranslation();

    const toggleRecovery = (ev) => {
        ev.preventDefault();
        setRecovery(!recovery);
    };
    const onEmailChange = (ev) => setEmail(ev.target.value);

    const content = recovery ? <PassRecovery email={ email } /> : <SignIn onEmailChange={ onEmailChange }/>;
    const recoveryBtn = (
        recovery ? 
        (<a href="#" className="form__link" onClick={toggleRecovery}>{ t('cancel') }</a>) : 
        (<a href="#" className="form__link" onClick={toggleRecovery}>{ t('forgot_password') }</a>)
    );

    return !router.query.l ? null: (
        <div className="form">
            { content }
            { recoveryBtn }

            <style jsx global>{`
            .form {
                position: relative;
                background: #fff;
                width: 300px;
                margin: 25px 0 0 25px;
                border-radius: 4px;
                z-index: 9999;
                padding: 30px;
                box-sizing: border-box;
                font-size: 16px;
                text-align: center;
                word-wrap: break-word;
            }

            @media (max-width: 500px) {
                .form {
                    margin: 25px auto;
                }
            }

            .form__header {
                padding: 0;
                margin: 0 0 30px 0;
                font-size: 28px;
            }

            .form__input {
                display: block;
                width: 100%;
                padding: 15px;
                border: 1px solid #eee;
                border-radius: 4px;
                margin-bottom: 30px;
                font-size: 16px;
                text-align: left;
                box-sizing: border-box;
            }

            .form__checkbox-block {
                margin-bottom: 30px;
                text-align: left;
                display: flex;
                align-items: center;
            }

            .form__checkbox {
                margin-right: 10px;
            }

            .form__btn {
                display: block;
                background: #333;
                color: #fff;
                border: 0;
                border-radius: 4px;
                padding: 15px;
                text-align: center;
                margin-bottom: 30px;
                font-size: 16px;
                width: 100%;
                box-sizing: border-box;
                outline: none;
            }

            .form__btn:active {
                transition: transform .2s ease;
                transform: scale(.95);
            }
            `}</style>
        </div>
    );
}

export default Form;
