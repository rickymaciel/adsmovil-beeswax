import Vue from 'vue'
import VueI18n from 'vue-i18n'
import getLocale from '@/utils/Locale'
// import Locale from '@/utils/Locale'

Vue.use(VueI18n)

const messages = {
    en: {
        welcomeMsg: 'Hello {name}',
        welcomeMsgDashboard: 'Welcome to your Dashboard',
        menu: {
            item1: 'Dashboard',
            item2: 'Advertiser',
            item3: 'Campaigns',
            item4: 'Line Item',
            item5: 'Creative',
            item6: 'Reporting',
            item7: 'Tools'
        },
        Unauthorized: 'Please enter a valid credential',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot Password',
        resetPassword: 'Reset Password',
        rememberMe: 'Keep me Logged in',
        enterEmail: 'Enter email',
        enterPassword: 'Enter password',
        loading: 'Loading...',
        fieldRequired: 'This field is required',
        minLength: 'Password must be at least {min} characters',
        invalidEmail: 'E-mail must be valid',
        backLogin: 'Back to login',
        Search: 'Search'
    },
    es: {
        welcomeMsg: 'Hola {name}',
        welcomeMsgDashboard: 'Bienvenido a tu panel',
        menu: {
            item1: 'Tablero',
            item2: 'Anunciante',
            item3: 'Campañas',
            item4: 'Elemento en linea',
            item5: 'Creativo',
            item6: 'Reportes',
            item7: 'Herramientas'
        },
        Unauthorized: 'Ingrese una credencial válida',
        login: 'Iniciar sesión',
        email: 'Correo electrónico',
        password: 'Contraseña',
        forgotPassword: '¿Olvidaste tu contraseña?',
        resetPassword: 'Restablecer la contraseña',
        rememberMe: 'Recordarme',
        enterEmail: 'Ingrese su correo electrónico',
        enterPassword: 'Ingrese su contraseña',
        loading: 'Cargando...',
        fieldRequired: 'Este campo es obligatorio',
        minLength: 'La contraseña debe tener al menos {min} caracteres',
        invalidEmail: 'El correo electrónico debe ser válido',
        backLogin: 'Atrás para iniciar sesión',
        Search: 'Buscar'
    },
    pt: {
        welcomeMsg: 'Olá {name}',
        welcomeMsgDashboard: 'Bem vindo ao seu painel',
        menu: {
            item1: 'Painel',
            item2: 'Anunciante',
            item3: 'Campanhas',
            item4: 'Item da linha',
            item5: 'Criativo',
            item6: 'Relatórios',
            item7: 'Ferramentas'
        },
        Unauthorized: 'Por favor, insira uma credencial válida',
        login: 'Iniciar sessão',
        email: 'Correio eletrônico',
        password: 'Senha',
        forgotPassword: 'Esqueceu sua senha?',
        resetPassword: 'Redefina sua senha',
        rememberMe: 'Mantenha-me conectado',
        enterEmail: 'Digite o e-mail',
        enterPassword: 'Digite a senha',
        loading: 'Carregando...',
        fieldRequired: 'Este campo é obrigatório',
        minLength: 'A senha deve ter pelo menos {min} caracteres',
        invalidEmail: 'E-mail deve ser válido',
        backLogin: 'Volte ao login',
        Search: 'Procurar'
    }
}

const i18n = new VueI18n({
    locale: getLocale, // set locale
    fallbackLocale: 'en', // set fallback locale
    messages // set locale messages
})

export default i18n
