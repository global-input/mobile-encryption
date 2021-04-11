import React, { useState, useCallback } from 'react';
import {ExportingContent} from './exporting';
import {ContentExported} from './exported';

enum PAGES {
    EXPORTING,
    EXPORTED,
};
interface ExportProps {
    domain: string;
    back: () => void;
}
export const ExportFormData: React.FC<ExportProps> = ({ domain, back }) => {
    const [page, setPage] = useState(PAGES.EXPORTING);
    const [content, setContent] = useState('');
    const onExported = useCallback((content: string) => {
        setContent(content);
        setPage(PAGES.EXPORTED);
    }, []);
    switch (page) {
        case PAGES.EXPORTING:            
            return (<ExportingContent domain={domain} onExported={onExported} back={back}/>);
        
        case PAGES.EXPORTED:
            return (<ContentExported domain={domain} content={content} finish={back}/>);

    }
    return null;
};


