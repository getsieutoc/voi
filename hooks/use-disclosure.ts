import { useToggle } from 'react-use';

export const useDisclosure = () => {
  const [on, toggle] = useToggle(false);

  const onOpen = () => toggle(true);
  const onClose = () => toggle(false);

  return {
    on,
    toggle,
    isOpen: on,
    onOpen,
    onClose,
  };
};
