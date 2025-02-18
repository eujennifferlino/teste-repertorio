import { useState } from 'react';
import { toast } from 'react-toastify';
import Paragraph from '../Paragraph/Paragraph';

interface ParagraphType {
  id: string;
  content: string;
}

const DraftEditor = () => {
  const [paragraphs, setParagraphs] = useState<ParagraphType[]>([]);
  const [currentParagraph, setCurrentParagraph] = useState('');

  const handleAddParagraph = () => {
    if (!currentParagraph.trim()) {
      toast.error('O parágrafo não pode estar vazio!', {
        position: "top-right",
        style: {
          background: '#fff0f0',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          color: '#333'
        }
      });
      return;
    }

    const newParagraph = {
      id: crypto.randomUUID(),
      content: currentParagraph
    };
    setParagraphs([...paragraphs, newParagraph]);
    setCurrentParagraph('');
    toast.success('✍️ Parágrafo adicionado!', {
      position: "top-right",
      style: {
        background: '#f0f9ff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#333'
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddParagraph();
    }
  };

  const handleReset = () => {
    setParagraphs([]);
    setCurrentParagraph('');
    toast.info('✨ Rascunho limpo!', {
      position: "top-right",
      style: {
        background: '#f0f9ff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#333'
      }
    });
  };

  const handleSaveDraft = () => {
    toast.success('📝 Rascunho salvo com sucesso!', {
      position: "top-right",
      style: {
        background: '#f0f9ff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#333'
      }
    });
    console.log('Rascunho salvo:', paragraphs);
  };

  return (
    <div className="draft-editor">
      <div className="editor-input">
        <textarea
          value={currentParagraph}
          onChange={(e) => setCurrentParagraph(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite seu parágrafo aqui..."
          rows={4}
        />
        <div className="button-group">
          <button onClick={handleAddParagraph}>Adicionar Parágrafo</button>
          <button onClick={handleReset}>Limpar Tudo</button>
          <button onClick={handleSaveDraft}>Salvar Rascunho</button>
        </div>
      </div>

      <h2>Visualização do Texto</h2>
      <div className="preview-area">
        {paragraphs.map((paragraph) => (
          <Paragraph 
            key={paragraph.id} 
            id={paragraph.id} 
            content={paragraph.content} 
          />
        ))}
      </div>
    </div>
  );
};

export default DraftEditor; 