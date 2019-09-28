import React from 'react';
import Router, { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";

const SignIn = (props) => {
    const useRuter = useRouter();
    const { t } = useTranslation();

    const handleSubmit = (ev) => {
        event.preventDefault();
        if (!ev.target.elements.email.value) {
            return;
        }
        Router.replace({ 
            pathname: Router.route, 
            query: { 
                ...Router.query,
                email: ev.target.elements.email.value
            }
        });
    };

    return (
        <form onSubmit={ handleSubmit }>
            <h1 className="form__header">{ t('sign_in') }</h1>
            <input type="text" 
                name="email"
                placeholder={ t('email') } 
                className="form__input"
                defaultValue={ useRuter.query.email }
                onChange={ props.onEmailChange }
            />
            <input type="password" placeholder={ t('password') } className="form__input" />
            <label className="form__checkbox-block">
                <input className="form__checkbox" type="checkbox" defaultChecked />
                { t('remember_me') }
            </label>
            <button className="form__btn">{ t('sign_in') }</button>
        </form>
    );
}

export default SignIn;
