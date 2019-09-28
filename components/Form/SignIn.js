import React from 'react';
import Router, { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";

const SignIn = () => {
    const useRuter = useRouter();
    const { t } = useTranslation();

    const handleChange = (ev) => {
        Router.replace({ 
            pathname: Router.route, 
            query:  { 
                ...Router.query,
                email: ev.target.value
            }
        });
    };

    return (
        <div>
            <h1 className="form__header">{ t('sign_in') }</h1>
            <input type="text" 
                name="email"
                placeholder={ t('email') } 
                className="form__input"
                defaultValue={ useRuter.query.email }
                onChange={handleChange}
            />
            <input type="password" placeholder={ t('password') } className="form__input" />
            <label className="form__checkbox-block">
                <input className="form__checkbox" type="checkbox" defaultChecked />
                { t('remember_me') }
            </label>
            <button className="form__btn">{ t('sign_in') }</button>
        </div>
    );
}

export default SignIn;
