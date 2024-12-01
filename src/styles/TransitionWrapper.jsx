import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../styles/Transition.css';

function TransitionWrapper({ children }) {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page-transition"
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}

export default TransitionWrapper;