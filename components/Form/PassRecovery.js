import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";

const PassRecovery = () => {
    const useRuter = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const title = document.title;
        document.title = ('pass_recovery');
        return () => document.title = title;
    });   

    return (
        <div>
            <h1 className="form__header">{ t('pass_recovery') }</h1>
            <input type="text" 
                placeholder={ t('email') } 
                className="form__input" 
                defaultValue={ useRuter.query.email } 
            />
            <button className="form__btn">{ t('restore') }</button>
        </div>
    );
}

export default PassRecovery;
