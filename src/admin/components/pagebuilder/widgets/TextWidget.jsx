import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
];

function TextWidget({ settings, onChange }) {
  const content = settings.content || '';

  return (
    <div className="pb-widget">
      <div className="pb-field">
        <label>Contenuto Testo</label>
        <div className="pb-quill-wrapper">
          <ReactQuill
            value={content}
            onChange={(val) => onChange({ ...settings, content: val })}
            modules={{ toolbar: TOOLBAR_OPTIONS }}
            theme="snow"
          />
        </div>
      </div>
    </div>
  );
}

export default TextWidget;
