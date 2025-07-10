import { useCallback, useRef, useState } from 'react';

interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (rotation: number) => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
}

interface GestureOptions {
  swipeThreshold?: number;
  pinchThreshold?: number;
  longPressDelay?: number;
  doubleTapDelay?: number;
  preventDefault?: boolean;
}

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

export function useMobileGestures(
  handlers: GestureHandlers,
  options: GestureOptions = {}
) {
  const {
    swipeThreshold = 50,
    pinchThreshold = 10,
    longPressDelay = 500,
    doubleTapDelay = 300,
    preventDefault = true,
  } = options;

  const startTouch = useRef<TouchPoint | null>(null);
  const lastTap = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const initialDistance = useRef<number>(0);
  const initialAngle = useRef<number>(0);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const getAngle = useCallback((touch1: Touch, touch2: Touch) => {
    return Math.atan2(
      touch2.clientY - touch1.clientY,
      touch2.clientX - touch1.clientX
    ) * (180 / Math.PI);
  }, []);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }
    setIsLongPressing(false);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    const touches = e.touches;
    const touch = touches[0];
    
    startTouch.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };

    // Handle multi-touch gestures
    if (touches.length === 2) {
      initialDistance.current = getDistance(touches[0], touches[1]);
      initialAngle.current = getAngle(touches[0], touches[1]);
      clearLongPressTimer();
      return;
    }

    // Start long press timer
    if (handlers.onLongPress) {
      longPressTimer.current = setTimeout(() => {
        setIsLongPressing(true);
        handlers.onLongPress?.();
        
        // Haptic feedback for long press
        if ('vibrate' in navigator) {
          navigator.vibrate([10, 50, 10]);
        }
      }, longPressDelay);
    }
  }, [handlers, preventDefault, longPressDelay, getDistance, getAngle, clearLongPressTimer]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    const touches = e.touches;
    
    if (!startTouch.current) return;

    // Handle pinch and rotate with two fingers
    if (touches.length === 2) {
      const currentDistance = getDistance(touches[0], touches[1]);
      const currentAngle = getAngle(touches[0], touches[1]);
      
      // Pinch gesture
      if (handlers.onPinch && Math.abs(currentDistance - initialDistance.current) > pinchThreshold) {
        const scale = currentDistance / initialDistance.current;
        handlers.onPinch(scale);
      }
      
      // Rotate gesture
      if (handlers.onRotate) {
        const rotation = currentAngle - initialAngle.current;
        handlers.onRotate(rotation);
      }
      
      clearLongPressTimer();
      return;
    }

    // Cancel long press if finger moves too much
    const touch = touches[0];
    const deltaX = Math.abs(touch.clientX - startTouch.current.x);
    const deltaY = Math.abs(touch.clientY - startTouch.current.y);
    
    if (deltaX > 10 || deltaY > 10) {
      clearLongPressTimer();
    }
  }, [handlers, preventDefault, getDistance, getAngle, pinchThreshold, clearLongPressTimer]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }

    if (!startTouch.current || isLongPressing) {
      clearLongPressTimer();
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startTouch.current.x;
    const deltaY = touch.clientY - startTouch.current.y;
    const deltaTime = Date.now() - startTouch.current.timestamp;
    
    clearLongPressTimer();

    // Check for swipe gestures
    if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.();
        } else {
          handlers.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.();
        } else {
          handlers.onSwipeUp?.();
        }
      }
      
      // Haptic feedback for swipe
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      return;
    }

    // Check for tap gestures
    if (deltaTime < 300) {
      const now = Date.now();
      
      // Double tap detection
      if (handlers.onDoubleTap && now - lastTap.current < doubleTapDelay) {
        handlers.onDoubleTap();
        lastTap.current = 0; // Reset to prevent triple tap
        
        // Haptic feedback for double tap
        if ('vibrate' in navigator) {
          navigator.vibrate([5, 30, 5]);
        }
      } else {
        // Single tap
        lastTap.current = now;
        
        // Delay single tap to check for double tap
        setTimeout(() => {
          if (lastTap.current === now) {
            handlers.onTap?.();
            
            // Haptic feedback for single tap
            if ('vibrate' in navigator) {
              navigator.vibrate(5);
            }
          }
        }, doubleTapDelay);
      }
    }

    startTouch.current = null;
  }, [handlers, preventDefault, swipeThreshold, doubleTapDelay, isLongPressing, clearLongPressTimer]);

  const gestureHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: clearLongPressTimer,
  };

  return {
    gestureHandlers,
    isLongPressing,
  };
}