import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { createViewerToken } from '@/actions/token';

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };
        const decodedName = decodedToken?.name;
        const decodedIdentity = decodedToken.jti;

        if (decodedIdentity) {
          setIdentity(decodedIdentity);
        }

        if (decodedName) {
          setName(decodedName);
        }
      } catch {
        toast.error('Something went wrong');
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
