import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';
import { useState } from 'react';

export default function Home() {
  const [hasVoted, setHasVoted] = useState(false);

  const onSuccess = async (result: ISuccessResult) => {
    console.log('✅ Verificación exitosa:', result);
    setHasVoted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>MiniApp: Verifica y Vota con World ID</h1>

      {!hasVoted ? (
        <IDKitWidget
          app_id="tu-app-id"
          action="voto-demo"
          onSuccess={onSuccess}
          signal="voto"
          credential_types={['orb']}
        >
          {({ open }) => <button onClick={open}>Verificar y Votar</button>}
        </IDKitWidget>
      ) : (
        <p>🎉 ¡Gracias por votar!</p>
      )}
    </div>
  );
}
