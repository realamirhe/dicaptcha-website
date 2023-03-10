import axios from 'axios';
import { useState } from 'react';
import { Captcha } from './captcha';
import { Inline } from './inline';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

export function Testable() {
  const [loading, setLoading] = useState(false);
  const [tokenStatus, setTokenState] = useState<'error' | 'resolved' | null>(
    null,
  );
  const [captchaData, setCaptchaData] = useState<{
    hash: string;
    tags: string[];
    image: string;
    trust: string[];
  } | null>(null);

  const loadCaptcha = async () => {
    if (loading) return;
    setLoading(true);
    setCaptchaData(null);
    setTokenState(null);
    const res = await axios.get(`/api/get-captcha`);
    setCaptchaData(res.data);
    setLoading(false);
  };

  return (
    <>
      <Box sx={{ mb: { xs: 1, md: null } }}>
        <Inline
          onClick={loadCaptcha}
          loading={loading}
          tokenStatus={tokenStatus}
        />
      </Box>
      <Captcha
        close={() => {
          setCaptchaData(null);
        }}
        refresh={loadCaptcha}
        open={!!captchaData}
        handleChange={captchaToken => {
          if (captchaToken === null) {
            setTokenState('error');
            toast.error(
              'Sorry please try again, and be more careful this time 🤖',
            );
          } else {
            setTokenState('resolved');
            toast.success('Conguradulation 🎉');
          }
        }}
        quiz={{
          hash: captchaData?.hash || '',
          image: { url: captchaData?.image || '', width: 640, height: 640 },
          tags: captchaData?.tags || [],
          trust: captchaData?.trust,
        }}
      />
    </>
  );
}
