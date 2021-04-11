import React, { useState, useCallback } from 'react';
import {ProvideContent} from './provide-content';
import {StartImport} from './import-content';


enum PAGES {
    CONTENT_TO_IMPORT,    
    START_IMPORT,
    IMPORT_COMPLETE

};
interface Props {
    domain: string;
    back: () => void;
}
export const ImportFormData: React.FC<Props> = ({ domain, back }) => {
    const [page, setPage] = useState(PAGES.CONTENT_TO_IMPORT);
    const [content, setContent] = useState('');
    const startImport = useCallback((content: string) => {
        setContent(content);
        setPage(PAGES.START_IMPORT);
    }, []);

    switch (page) {
        case PAGES.CONTENT_TO_IMPORT:
            return (<ProvideContent domain={domain} cancel={back} startImport={startImport} />);
        case PAGES.START_IMPORT:
            return (<StartImport domain={domain} cancel={back} content={content} finish={back}/>);
        

    }
    return null;
};


