import React, { useCallback, useState } from 'react';

import MobileEncryption from './mobile-encryption';
import MobileDecryption from './mobile-decryption';
import {MainPage} from './MainPage';
import {QRCodeGenerator} from './qr-code-generator';
import {ExportFormData} from './export-form-data';
import {ImportFormData} from './import-form-data';

enum PAGES {
    MAIN_PAGE,
    ENCRYPTION,
    DECRYPTION,
    QR_CODE_GENERATOR, 
    EXPORT_FORM_DATA,
    IMPORT_FORM_DATA
}

const App = () => {
    const [page, setPage] = useState(PAGES.MAIN_PAGE);
    const [domain] = useState<string>('');
    const mainPage = useCallback(() => setPage(PAGES.MAIN_PAGE), []);
    const encryption = useCallback(() => setPage(PAGES.ENCRYPTION), []);
    const decryption = useCallback(() => setPage(PAGES.DECRYPTION), []);
    const qrCodeGenerator = useCallback(() => setPage(PAGES.QR_CODE_GENERATOR), []);
    const exportFormData=useCallback(() => setPage(PAGES.EXPORT_FORM_DATA), []);
    const importFormData=useCallback(() => setPage(PAGES.IMPORT_FORM_DATA), []);
    
    switch (page) {
        case PAGES.ENCRYPTION:
            return (<MobileEncryption back={mainPage} domain={domain} />);
        case PAGES.DECRYPTION:
            return (<MobileDecryption back={mainPage} domain={domain} />);
        case PAGES.MAIN_PAGE:
            return (<MainPage domain={domain} encryption={encryption}
                decryption={decryption}
                qrCodeGenerator={qrCodeGenerator} exportFormData={exportFormData} importFormData={importFormData}/>);
        case PAGES.QR_CODE_GENERATOR:
            return (<QRCodeGenerator back={mainPage} />);
        case PAGES.EXPORT_FORM_DATA:
            return (<ExportFormData domain={domain} back={mainPage}/>);
        case PAGES.IMPORT_FORM_DATA:
            return (<ImportFormData domain={domain} back={mainPage}/>);

        default:
            return null;
    }
};
export default App;
