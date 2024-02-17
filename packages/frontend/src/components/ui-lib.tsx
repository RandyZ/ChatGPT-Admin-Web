import { createRoot } from 'react-dom/client';

import { IconButton } from '@/components/button';
import CloseIcon from '@/icons/close.svg';
import ReturnIcon from '@/icons/return.svg';
import LoadingIcon from '@/icons/three-dots.svg';
import Locale from '@/locales';
import styles from '@/styles/module/ui-lib.module.scss';
import clsx from 'clsx';

export function Popover(props: {
  children: JSX.Element;
  content: JSX.Element;
  open?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className={styles.popover}>
      {props.children}
      {props.open && (
        <div className={styles['popover-content']}>
          <div className={styles['popover-mask']} onClick={props.onClose}></div>
          {props.content}
        </div>
      )}
    </div>
  );
}

export function Card(props: { children: JSX.Element[]; className?: string }) {
  return (
    <div className={styles.card + ' ' + props.className}>{props.children}</div>
  );
}

export function ListItem(props: Readonly<{ 
  title?: string;
  subTitle?: string;
  children?: JSX.Element | JSX.Element[];
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
}>) {
  return (
    <div
      className={styles["list-item"] + ` ${props.className || ""}`}
      onClick={props.onClick}
    >
      <div className={styles["list-header"]}>
        {props.icon && <div className={styles["list-icon"]}>{props.icon}</div>}
        <div className={styles["list-item-title"]}>
          {props.title && <div>{props.title}</div>}
          {props.subTitle && (
            <div className={styles["list-item-sub-title"]}>
              {props.subTitle}
            </div>
          )}
        </div>
      </div>
      {props.children}
    </div>
  );
}

export function List(props: { children: React.ReactNode; id?: string }) {
  return (
    <div className={styles.list} id={props.id}>
      {props.children}
    </div>
  );
}

export function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingIcon />
    </div>
  );
}

export function LoadingSmall() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingIcon />
    </div>
  );
}

interface ModalProps {
  title: string;
  children?: JSX.Element;
  actions?: JSX.Element[];
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Modal(props: ModalProps) {
  return (
    <div className={clsx(styles['modal-container'],props.className)} style={props.style}>
      <div className={styles['modal-header']}>
        <div className={styles['modal-title']}>{props.title}</div>

        <div className={styles['modal-close-btn']} onClick={props.onClose}>
          <CloseIcon />
        </div>
      </div>

      <div className={styles['modal-content']}>{props.children}</div>

      {props.actions && (
        <div className={styles['modal-footer']}>
          <div className={styles['modal-actions']}>
            {props.actions?.map((action, i) => (
              <div key={i} className={styles['modal-action']}>
                {action}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function showModal(props: ModalProps) {
  const div = document.createElement('div');
  div.className = 'modal-mask';
  document.body.appendChild(div);

  const root = createRoot(div);
  const closeModal = () => {
    props.onClose?.();
    root.unmount();
    div.remove();
  };

  div.onclick = (e) => {
    if (e.target === div) {
      closeModal();
    }
  };

  root.render(<Modal {...props} onClose={closeModal}></Modal>);
}

export type ToastProps = { content: string };

export function Toast(props: ToastProps) {
  return (
    <div className={styles['toast-container']}>
      <div className={styles['toast-content']}>{props.content}</div>
    </div>
  );
}

export function showToast(content: string, delay = 3000) {
  const div = document.createElement('div');
  div.className = styles.show;
  document.body.appendChild(div);

  const root = createRoot(div);
  const close = () => {
    div.classList.add(styles.hide);

    setTimeout(() => {
      root.unmount();
      div.remove();
    }, 300);
  };

  setTimeout(() => {
    close();
  }, delay);

  root.render(<Toast content={content} />);
}

export function ReturnButton(props: { onClick: () => void }) {
  return (
    <div className={styles['return-button-wrapper']}>
      <div className={styles['return-button']}>
        <IconButton
          icon={<ReturnIcon />}
          onClick={props.onClick}
          bordered
          title={Locale.Settings.Actions.Close}
        />
      </div>
    </div>
  );
}

export function Selector<T>(props: Readonly<{
  items: Array<{
    title: string;
    subTitle?: string;
    value: T;
  }>;
  defaultSelectedValue?: T;
  onSelection?: (selection: T[]) => void;
  onClose?: () => void;
  multiple?: boolean;
}>) {
  return (
    <div className={styles["selector"]} onClick={() => props.onClose?.()}>
      <div className={styles["selector-content"]}>
        <List>
          {props.items.map((item, i) => {
            const selected = props.defaultSelectedValue === item.value;
            return (
              <ListItem
                className={styles["selector-item"]}
                key={i}
                title={item.title}
                subTitle={item.subTitle}
                onClick={() => {
                  props.onSelection?.([item.value]);
                  props.onClose?.();
                }}
              >
                {selected ? (
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: "var(--primary)",
                      borderRadius: 10,
                    }}
                  ></div>
                ) : (
                  <></>
                )}
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}
