import { useEffect } from 'react'

function ToastMessage({ toast, removeToast }) {
	const icons = {
		success: 'fas fa-check-circle',
		info: 'fas fa-info-circle',
		error: 'fas fa-exclamation-circle'
	}


	useEffect(() => {
		const autoRemove = setTimeout(() => removeToast(toast.id), 4000)

		return () => clearTimeout(autoRemove)
	}, [toast])

	const toastMessage = (
		<div className={'toast toast--' + toast.type}>
			<div className="toast__icon">
				<i className={icons[toast.type]}></i>
			</div>
			<div className="toast__body">
				<h3 className="toast__title">{toast.title}</h3>
			</div>
			<div className="toast__close" onClick={() => removeToast(toast.id)}>
				<i className="fas fa-times"></i>
			</div>
		</div>
	)

	return (
		<>
			{toast && toastMessage}
		</>
	)
}

export default ToastMessage