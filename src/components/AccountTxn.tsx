import { formatAtLeast2SignificantNoSci } from "@/utils/formatting";
import { Address, formatEther } from "viem";
import { useTimePassed } from "./Time";
import { DateTime } from "luxon";
import Link from "next/link";

function NegativeSvg() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function PositiveSvg() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default function AccountTxn({
	amount,
	address,
	direction,
	blockTimestamp,
	blockNumber,
	transactionFee,
}: {
	amount: number;
	address: Address;
	direction: "To" | "From";
	blockTimestamp: string;
	blockNumber: number;
	transactionFee: string;
}) {
	const timeSince = useTimePassed(
		DateTime.fromISO(blockTimestamp).toMillis()
	);
	return (
		<div
			className={`flex ${
				direction === "To" ? "bg-brand-red" : "bg-brand-green"
			} px-5 py-4 md:px-4 md:py-2.5 gap-x-2 border-2 border-black rounded-2xl md:rounded-3xl overflow-hidden`}
		>
			<span className="my-1">
				{direction === "To" ? NegativeSvg() : PositiveSvg()}
			</span>
			<div className="flex flex-col gap-1 md:gap-2 w-full">
				<div className="flex lg:flex-row flex-col justify-between gap-1 md:gap-1 md:gap-x-8 lg:items-center">
					<Link
						href={`/wallet/${address}`}
						className="font-semibold text-sm md:text-base hover:underline underline-offset-2"
					>
						{direction}: {address.slice(0, 16) + "..."}
					</Link>
					<span className="font-semibold text-sm md:text-base">
						Amount:{" "}
						{formatAtLeast2SignificantNoSci(
							parseFloat(formatEther(BigInt(amount)))
						)}{" "}
						Eth
					</span>
				</div>
				<div className="flex lg:flex-row flex-col justify-between gap-1 md:gap-1 md:gap-x-8 lg:items-center">
					<span className="font-normal text-sm md:text-base">
						{timeSince} ago, Block {blockNumber}
					</span>
					<span className="font-normal text-sm md:text-base">
						Fee: {parseFloat(transactionFee).toFixed(10)}
					</span>
				</div>
			</div>
		</div>
	);
}
