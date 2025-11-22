/** @format */

type LoseAnimationProps = {
	message?: string;
};

export default function LoseAnimation({
	message = "Returning to games...",
}: LoseAnimationProps) {
	return (
		<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50 absolute top-0 bottom-0 left-0 right-0">
			<div className="text-center">
				<div className="text-8xl mb-8 animate-pulse">😢</div>
				<h1 className="text-6xl font-bold text-red-400 mb-4 animate-pulse">
					DEFEAT
				</h1>
				<div className="flex gap-4 justify-center mb-6">
					<div className="text-3xl animate-pulse">💔</div>
					<div
						className="text-3xl animate-pulse"
						style={{ animationDelay: "0.1s" }}>
						😔
					</div>
					<div
						className="text-3xl animate-pulse"
						style={{ animationDelay: "0.2s" }}>
						💔
					</div>
				</div>
				<p className="text-gray-400">{message}</p>
			</div>
		</div>
	);
}
