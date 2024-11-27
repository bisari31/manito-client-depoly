import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

import { useToast } from '@/stores/toast-store';
import { getFontSizeAndWeight } from '@/styles/mixins';

export default function ToastProvier() {
  const toast = useToast();

  return createPortal(
    <AnimatePresence>
      {toast.map((item) => (
        <StyledTosatItem
          key={item.id}
          initial={{
            opacity: 0,
            y: 20,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 20,
          }}
        >
          {item.message}
        </StyledTosatItem>
      ))}
    </AnimatePresence>,
    document.getElementById('toast')!,
  );
}

const StyledTosatItem = styled(motion.div)`
  display: flex;
  border-radius: 10px;
  padding: 36px 24px;
  left: 50%;
  top: 50%;
  z-index: 9999999999999999999;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors['gray-300']};
  color: ${({ theme }) => theme.colors['gray-900']};
  ${getFontSizeAndWeight('heading3', 'bold')};
`;
