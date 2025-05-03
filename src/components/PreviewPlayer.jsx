import React, { useEffect, useRef } from 'react';

const PreviewPlayer = ({ videoId, previewDuration = 10 }) => {
    const iframeRef = useRef(null);
    useEffect(() => {
        const onMessage = (event) => {
            if (!event.data || typeof event.data !== 'string') return;

            const message = JSON.parse(event.data);
            if (message.event === 'onStateChange' && message.info === 1) {
                setTimeout(() => {
                    iframeRef.current.contentWindow.postMessage(
                        JSON.stringify({ event: 'command', func: 'pauseVideo' }),
                        '*'
                    );
                }, previewDuration * 1000);
            }
        };

        window.addEventListener('message', onMessage);
        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [previewDuration]);

    return (
        <iframe
            ref={iframeRef}
            className="w-full aspect-video rounded-lg shadow"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            title="YouTube preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

export default PreviewPlayer;
