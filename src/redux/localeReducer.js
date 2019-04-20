import { createAction, handleActions } from 'redux-actions';


const country = 'country';

export const setContry = createAction(country);

const en = {
    login: ['Please login to your account', 'Remember me', 'Login', 'Sign up'],
    join: ['Please complete to create your account', 'I agree with terms and conditions',
    'Sign up', 'Login'],
    project: ['PROJECT SELECT', 'PROJECT', 'DESCRIPTION', 'CREATED', 'UPDATED',
    'Edit', 'Delete', 'PROJECT REGISTER', 'Project', 'Description', 'station', 'name',
        'connect ip', 'CREATE', 'Please correct the project', 'Project name', 'Description',
        'station', 'name', 'connect ip' ,'Cancel', 'Edit', 'Enter the user password for the project to be deleted', 'Password',
        'Cancel', 'Deleted', 'project name', 'connect port'],
    main: ['PROJECT NAME', 'PROJECT', 'LOGOUT', 'DASHBOARD', 'CCTV'],
    dashboard: ['NAME', 'PARTNUMBER', 'CYCLETIME', 'TOTAL', 'OK', 'NOK']
};

const ko = {
    login: ['당신의 계정으로 로그인 하십시오', '이 계정을 기억하겠습니다', '로그인', '가입'],
    join: ['해당 양식으로 계정을 작성해주세요', '이용 약관에 동의하겠습니다', '가입', '로그인'],
    project: ['프로젝트를 선택하십시오', '프로젝트', '설명', '생성날짜', '수정날짜', '편집', '삭제', '프로젝트 생성', '프로젝트', '설명', '스테이션', '이름', '연결 아이피', '생성',
    '프로젝트를 수정하십시오', '프로젝트 이름', '설명', 'station', '이름', '연결 아이피', '취소',
        '수정', '삭제할 프로젝트의 사용자 암호를 입력하세요', '비밀번호', '취소', '삭제', 'project name', 'connect port'],
    main: ['프로젝트 이름', '프로젝트 목록', '로그아웃', 'DASHBOARD', 'CCTV'],
    dashboard: ['이름', 'PARTNUMBER', 'CYCLETIME', '합계', '합격', '불량']
};

const de = {
    login: ['Loggen Sie sich in Ihr Konto ein', 'Erinnerst du dich an mich?', 'Einloggen', 'Neu registrieren'],
    join: ['Füllen Sie bitte das entsprechende Formular aus', 'Ich stimme den Nutzungsbedingungen zu',
        'Sign up', 'Login'],
    project: ['Wählen Sie ein Projekt', 'Projekt', 'Beschreibung', 'CREATED', 'UPDATED',
        'Bearbeiten', 'Entfernen', 'Projekt erstellen', 'Projekt', 'Beschreibung', 'station', 'name',
        'IP verbinden', 'erstellen', 'Ändern Sie das Projekt', 'Projektname', 'Beschreibung',
        'station', 'name', 'IP verbinden' ,'stornieren', 'Bearbeiten', 'Geben Sie das Benutzerpasswort für das zu löschende Projekt ein', 'Passwort',
        'Stornieren', 'Gelöscht', 'project name', 'connect port'],
    main: ['Projekt erstellen', 'Projekt', 'Ausloggen', 'INSTRUMENTENTAFEL', 'CCTV'],
    dashboard: ['NAME', 'PARTNUMBER', 'CYCLETIME', 'TOTAL', 'OK', 'NOK']
};

const initialState = {
  text: en
};

export default handleActions({
    [country]: (state, action) => {
        const country = action.payload;
        let data;
        switch (country) {
            case 'en':
                data = en;
                break;
            case 'ko':
                data = ko;
                break;
            case 'de':
                data = de;
                break;
            default:
                data = en;
                break;
        }
        return {
            ...state,
            text: data
        }
    }
},initialState);
