interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  if (!open) return null;
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 z-50 lg:hidden">{children}</div>
    </>
  );
}
