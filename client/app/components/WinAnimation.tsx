/** @format */

type WinAnimationProps = {
	winnerName: string;
	winnerImg: string;
	message?: string;
};

export default function WinAnimation({
	winnerName,
	winnerImg,
	message = "Returning to games...",
}: WinAnimationProps) {
	return (
		<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50 absolute top-0 bottom-0 left-0 right-0">
			<div className="text-center">
				<div className="text-8xl mb-8 animate-bounce">🏆</div>
				<h1 className="text-6xl font-bold text-yellow-400 mb-4 animate-pulse">
					VICTORY!
				</h1>
				<div className="flex justify-center items-center gap-4 mb-6">
					<div className="rounded-full w-20 h-20 overflow-hidden border-4 border-yellow-400">
						<img
							src={winnerImg}
							alt="winner"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
				<h2 className="text-4xl font-semibold text-white mb-8">
					{winnerName} Wins!
				</h2>
				<div className="flex gap-4 justify-center mb-6">
					<div className="text-3xl animate-bounce">🎉</div>
					<div
						className="text-3xl animate-bounce"
						style={{ animationDelay: "0.1s" }}>
						✨
					</div>
					<div
						className="text-3xl animate-bounce"
						style={{ animationDelay: "0.2s" }}>
						🎊
					</div>
					<div
						className="text-3xl animate-bounce"
						style={{ animationDelay: "0.3s" }}>
						⭐
					</div>
					<div
						className="text-3xl animate-bounce"
						style={{ animationDelay: "0.4s" }}>
						🎉
					</div>
				</div>
				<p className="text-gray-400">{message}</p>
			</div>
		</div>
	);
}
