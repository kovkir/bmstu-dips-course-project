import StarIcon_ from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import "./Icons.css";


interface StarIconProps {
	color: string
	addContainerClassName?: string
	addClassName?: string
	fill?: boolean
	onClick?: () => void
}

export function StarIcon(props: StarIconProps) {
	return (
		<div className={ `icon-container ${props.addContainerClassName}` }>
			<div
				className={ `icon ${props.addClassName}` }
				onClick={ props.onClick }
			>	
				{ props.fill 
					? <StarIcon_ fontSize="medium" sx={{ color: props.color }}/>
					: <StarBorderIcon fontSize="medium" sx={{ color: props.color }}/>
				}
			</div>
		</div>
	)
}
