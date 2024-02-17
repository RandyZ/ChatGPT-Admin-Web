import { useMemo, useRef, useState } from "react";

import RobotIcon from '@/icons/robot.svg';
import styles from '@/styles/module/chat.module.scss';
import { Selector, showToast } from "../ui-lib";

/**
 * Chat actions
 * @param props 
 * @returns 
 */
export function ChatActions(props: {
  showPromptModal: () => void;
  scrollToBottom: () => void;
  showPromptHints: () => void;
  hitBottom: boolean;
}) {
  // const config = useAppConfig();
  // const navigate = useNavigate();
  // const chatStore = useChatStore();

  // // switch themes
  // const theme = config.theme;
  // function nextTheme() {
  //   const themes = [Theme.Auto, Theme.Light, Theme.Dark];
  //   const themeIndex = themes.indexOf(theme);
  //   const nextIndex = (themeIndex + 1) % themes.length;
  //   const nextTheme = themes[nextIndex];
  //   config.update((config) => (config.theme = nextTheme));
  // }

  // // stop all responses
  // const couldStop = ChatControllerPool.hasPending();
  // const stopAll = () => ChatControllerPool.stopAll();

  // // switch model
  // const currentModel = chatStore.currentSession().mask.modelConfig.model;
  // const allModels = useAllModels();
  // const models = useMemo(
  //   () => allModels.filter((m) => m.available),
  //   [allModels],
  // );
  const [showModelSelector, setShowModelSelector] = useState(false);
  
  const [currentModel, setCurrentModel] = useState('gpt-3.5-turbo-0613');
  // useEffect(() => {
  //   // if current model is not available
  //   // switch to first available model
  //   const isUnavaliableModel = !models.some((m) => m.name === currentModel);
  //   if (isUnavaliableModel && models.length > 0) {
  //     const nextModel = models[0].name as ModelType;
  //     chatStore.updateCurrentSession(
  //       (session) => (session.mask.modelConfig.model = nextModel),
  //     );
  //     showToast(nextModel);
  //   }
  // }, [chatStore, currentModel, models]);
  const models = [
    {
        "id": 1,
        "name": "gpt-3.5-turbo-0613",
        "label": "GPT 3.5"
    },
    {
        "id": 2,
        "name": "gpt-4-turbo",
        "label": "GPT 4"
    }
  ];
  return (
    <div className={styles["chat-input-actions"]}>
      <ChatAction
        onClick={() => setShowModelSelector(true)}
        text={currentModel}
        icon={<RobotIcon />}
      />

      {showModelSelector && (
        <Selector
          defaultSelectedValue={currentModel}
          items={models.map((m) => ({
            title: m.label,
            value: m.name,
          }))}
          onClose={() => setShowModelSelector(false)}
          onSelection={(s) => {
            if (s.length === 0) return;
            showToast(`使用模型：${s[0]}`);
            setCurrentModel(s[0]);
          }}
        />
      )}
    </div>
  );
}

export function ChatAction(props: Readonly<{
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}>) {
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState({
    full: 16,
    icon: 16,
  });

  function updateWidth() {
    if (!iconRef.current || !textRef.current) return;
    const getWidth = (dom: HTMLDivElement) => dom.getBoundingClientRect().width;
    const textWidth = getWidth(textRef.current);
    const iconWidth = getWidth(iconRef.current);
    setWidth({
      full: textWidth + iconWidth,
      icon: iconWidth,
    });
  }

  return (
    <div
      className={`${styles["chat-input-action"]} clickable`}
      onClick={() => {
        props.onClick();
        setTimeout(updateWidth, 1);
      }}
      onMouseEnter={updateWidth}
      onTouchStart={updateWidth}
      style={
        {
          "--icon-width": `${width.icon}px`,
          "--full-width": `${width.full}px`,
        } as React.CSSProperties
      }
    >
      <div ref={iconRef} className={styles["icon"]}>
        {props.icon}
      </div>
      <div className={styles["text"]} ref={textRef}>
        {props.text}
      </div>
    </div>
  );
}