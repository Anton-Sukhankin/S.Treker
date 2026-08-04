function createIcon(name) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', name);
        icon.style.width = '16px';
        icon.style.height = '16px';
        return icon;
    }

export function createFeedbackOverlayController(options) {
        const { toastContainerId, onCreateIcons } = options;

        function showToast(title, message) {
            const container = document.getElementById(toastContainerId);
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = 'toast';

            const content = document.createElement('div');
            content.className = 'toast-content';

            const titleElement = document.createElement('div');
            titleElement.className = 'toast-title';
            titleElement.textContent = title;

            const messageElement = document.createElement('div');
            messageElement.className = 'toast-message';
            messageElement.textContent = message;

            const closeButton = document.createElement('button');
            closeButton.className = 'btn-close-toast';
            closeButton.appendChild(createIcon('x'));

            content.appendChild(titleElement);
            content.appendChild(messageElement);
            toast.appendChild(content);
            toast.appendChild(closeButton);
            container.appendChild(toast);

            if (typeof onCreateIcons === 'function') onCreateIcons();

            const hideToast = () => {
                if (!toast.parentElement) return;
                toast.classList.add('hiding');
                setTimeout(() => toast.remove(), 300);
            };

            closeButton.addEventListener('click', hideToast);
            setTimeout(hideToast, 3000);
        }

        return {
            showToast
        };
    }
