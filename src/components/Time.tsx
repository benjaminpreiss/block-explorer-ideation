import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export function useTimePassed(timestampMillis: number) {
	const [timePassed, setTimePassed] = useState("");

	useEffect(() => {
		if (typeof timestampMillis !== "number" || isNaN(timestampMillis)) {
			setTimePassed("Invalid timestamp");
			return;
		}

		const updateTimePassed = () => {
			const start = DateTime.fromMillis(timestampMillis);
			const now = DateTime.now();

			const diff = now.diff(start, [
				"years",
				"months",
				"days",
				"hours",
				"minutes",
				"seconds",
			]);

			const parts = [];
			if (diff.years) parts.push(`${Math.floor(diff.years)}y`);
			if (diff.months) parts.push(`${Math.floor(diff.months)}mo`);
			if (diff.days) parts.push(`${Math.floor(diff.days)}d`);
			if (diff.hours) parts.push(`${Math.floor(diff.hours)}h`);
			if (diff.minutes) parts.push(`${Math.floor(diff.minutes)}m`);

			parts.push(`${Math.floor(diff.seconds)}s`);

			setTimePassed(parts.join(" ") || "0s");
		};

		updateTimePassed();

		const interval = setInterval(updateTimePassed, 1000);

		return () => clearInterval(interval);
	}, [timestampMillis]);

	return timePassed;
}

export default function TimeTracker({
	timestampMillis,
}: {
	timestampMillis: number;
}) {
	const [mounted, setMounted] = useState(false);
	const timePassed = useTimePassed(timestampMillis);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <span>--</span>;
	}

	return <span>{timePassed}</span>;
}
