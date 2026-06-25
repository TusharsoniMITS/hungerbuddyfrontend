import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { serverURL } from '../services/FetchNodeServices';

export default function EditIconComponent({ image }) {
    const [iconState, setIconState] = useState(false);

    return (
        <div style={{ position: 'relative', width: '50%', height: '8vh', }}
            onMouseEnter={() => setIconState(true)}
            onMouseLeave={() => setIconState(false)}
        >
            <img
                src={`${serverURL}/images/${image}`}
                alt="preview"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    objectFit: 'cover',
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(2px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    opacity: iconState ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    pointerEvents: 'none',
                }}
            >
                <EditIcon style={{ color: 'white', fontSize: 35 }} />
            </div>
        </div>
    );
}