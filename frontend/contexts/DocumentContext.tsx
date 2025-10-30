
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface DocumentContextType {
  documentName: string | null;
  setDocumentName: (name: string | null) => void;
  knowledgeBaseGenerated: boolean;
  setKnowledgeBaseGenerated: (generated: boolean) => void;
}

export const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [knowledgeBaseGenerated, setKnowledgeBaseGenerated] = useState<boolean>(false);

  return (
    <DocumentContext.Provider value={{ documentName, setDocumentName, knowledgeBaseGenerated, setKnowledgeBaseGenerated }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
