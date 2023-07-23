import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";

export const useSWRegistration = () => {
	const { t } = useTranslation();

	const { updateServiceWorker } = useRegisterSW({
		onNeedRefresh() {
			const id = toast(
				<div>
					<p className="mb-2">{t("message.worker-update")}</p>
					<div className="flex gap-4">
						<Button
							variant="accent"
							onClick={() => updateServiceWorker()}
						>
							{t("label.reload")}
						</Button>
						<Button
							variant="neutral2"
							onClick={() => toast.dismiss(id)}
						>
							{t("label.close")}
						</Button>
					</div>
				</div>,
				{ id: "workerUpdate", duration: Infinity },
			);
		},
	});
};
