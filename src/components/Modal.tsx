import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
interface ModalProps {
	title: string;
	children: ReactNode;
	onClose?: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
	return (
		<Transition appear show={true} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-30"
				onClose={() => onClose?.()}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
						>
							<Dialog.Panel
								className={
									"w-max transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-900 dark:border dark:border-neutral-800 dark:shadow-none"
								}
							>
								<Dialog.Title
									as="h3"
									className="mb-4 text-center text-lg font-medium leading-6"
								>
									{title}
								</Dialog.Title>

								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
