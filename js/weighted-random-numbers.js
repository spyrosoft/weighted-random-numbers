/* -------------------- Globals -------------------- */

var random_graph_distribution;
var random_graph_distribution_max;
var random_graph_function;

var random_graph_generation_iterations_limit = 10000;
var random_graph_generation_iteration;
var random_graph_generation_delay = 1;
var random_graph_generation_timeout;

var predefined_graph_distribution;
var predefined_graph_distribution_max;
var predefined_graph_function;
var predefined_graph_generation_iteration;

var buckets;
var number_of_buckets = 200;

/* -------------------- End Globals -------------------- */


/* -------------------- Initialization -------------------- */

$(document).ready(
	function()
	{
		$( '#random-button' ).click(
			function()
			{
				begin_generating_graphs( random_function_random, predefined_function_random );
			}
		);
		$( '#karl-button' ).click(
			function()
			{
				begin_generating_graphs( random_function_karl, predefined_function_karl );
			}
		);
		$( '#x-squared-button' ).click(
			function()
			{
				begin_generating_graphs( random_function_x_squared, predefined_function_x_squared );
			}
		);
		$( '#x-tesseracted-button' ).click(
			function()
			{
				begin_generating_graphs( random_function_x_tesseracted, predefined_function_x_tesseracted );
			}
		);
		$( '#buckets-button' ).click(
			function()
			{
				begin_generating_graphs( random_function_buckets, predefined_function_buckets );
			}
		);
		
		initialize_buckets();
	}
);

/* -------------------- End Initialization -------------------- */


/* -------------------- Graphing -------------------- */

function begin_generating_graphs( random_function, predefined_function )
{
	random_graph_function = random_function;
	predefined_graph_function = predefined_function;
	generate_predefined_graph();
	generate_random_graph();
}

/* ---------- Predefined ---------- */

function generate_predefined_graph()
{
	predefined_graph_distribution = new Array;
	for ( i = 0; i < 100; i++ )
	{
		predefined_graph_distribution[ i ] = 0;
	}
	predefined_graph_distribution_max = 0;
	predefined_graph_iterations();
	draw_predefined_graph_distribution();
}

function predefined_graph_iterations()
{
	for ( var i = 0; i < 100; i++ )
	{
		predefined_graph_generation_iteration = i;
		var weighted_faux_random_number = get_weighted_predefined_number();
		add_to_predefined_graph_distribution( weighted_faux_random_number );
	}
}

function get_weighted_predefined_number()
{
	return predefined_graph_function();
}

function add_to_predefined_graph_distribution( faux_random_number )
{
	predefined_graph_distribution_index = Math.floor( faux_random_number * 100 );
	predefined_graph_distribution[ predefined_graph_distribution_index ]++;
	if ( predefined_graph_distribution[ predefined_graph_distribution_index ] > predefined_graph_distribution_max )
	{
		predefined_graph_distribution_max = predefined_graph_distribution[ predefined_graph_distribution_index ];
	}
}

function draw_predefined_graph_distribution()
{
	for ( var i = 0; i < predefined_graph_distribution.length; i++ )
	{
		var predefined_graph_row_width_percent = Math.floor(
			predefined_graph_distribution[ i ] / predefined_graph_distribution_max * 100
		);
		
		document.getElementById( 'predefined-graph-row-' + i ).style.width = predefined_graph_row_width_percent + '%';
	}
}

/* ---------- End Predefined ---------- */

/* ---------- Random ---------- */

function generate_random_graph()
{
	random_graph_distribution = new Array;
	for ( i = 0; i < 100; i++ )
	{
		random_graph_distribution[ i ] = 0;
	}
	random_graph_generation_iteration = 0;
	random_graph_distribution_max = 0;
	random_graph_iteration();
}

function random_graph_iteration()
{
	if ( random_graph_generation_iteration >= random_graph_generation_iterations_limit )
	{
		return;
	}
	
	var decimal_number_to_add = get_weighted_random_number();
	
	add_to_random_graph_distribution( decimal_number_to_add );
	
	random_graph_generation_iteration++;
	
	draw_random_graph_distribution();
	
	random_graph_generation_timeout = setTimeout( 'random_graph_iteration();', random_graph_generation_delay );
}

function get_weighted_random_number()
{
	return random_graph_function();
}

function add_to_random_graph_distribution( decimal_number_to_add )
{
	random_graph_distribution_index = Math.floor( decimal_number_to_add * 100 );
	random_graph_distribution[ random_graph_distribution_index ]++;
	if ( random_graph_distribution[ random_graph_distribution_index ] > random_graph_distribution_max )
	{
		random_graph_distribution_max = random_graph_distribution[ random_graph_distribution_index ];
	}
}

function draw_random_graph_distribution()
{
	for ( var i = 0; i < random_graph_distribution.length; i++ )
	{
		var random_graph_row_width_percent = Math.floor(
			random_graph_distribution[ i ] / random_graph_distribution_max * 100
		);
		
		document.getElementById( 'random-graph-row-' + i ).style.width = random_graph_row_width_percent + '%';
	}
}

/* ---------- End Random ---------- */

/* -------------------- End Graphing -------------------- */


/* -------------------- Predefined Functions -------------------- */

function predefined_function_random()
{
	return predefined_graph_generation_iteration / 100;
}

function predefined_function_karl()
{
	var first_random_number = predefined_graph_generation_iteration / 100;
	var second_random_number = ( 100 - predefined_graph_generation_iteration - 1 ) / 100;
	return technique_karl( first_random_number, second_random_number );
}

function predefined_function_x_squared()
{
	return technique_x_squared( predefined_graph_generation_iteration / 100 );
}

function predefined_function_x_tesseracted()
{
	return technique_x_tesseracted( predefined_graph_generation_iteration / 100 );
}

function predefined_function_buckets()
{
	return technique_buckets( ( predefined_graph_generation_iteration / 100 ) * buckets[ number_of_buckets - 1 ] );
}

/* -------------------- End Predefined Functions -------------------- */


/* -------------------- Random Functions -------------------- */

function random_function_random()
{
	return Math.random();
}

function random_function_karl()
{
	return technique_karl( Math.random(), Math.random() );
}

function random_function_x_squared()
{
	return technique_x_squared( Math.random() );
}

function random_function_x_tesseracted()
{
	return Math.pow( Math.random(), 4 );
}

function random_function_buckets()
{
	return technique_buckets( Math.random() * buckets[ number_of_buckets - 1 ] );
}

/* -------------------- End Random Functions -------------------- */


/* -------------------- Techniques -------------------- */

function technique_random( random_number )
{
	return random_number;
}

function technique_karl( first_random_number, second_random_number )
{
	return first_random_number - ( second_random_number * first_random_number );
}

function technique_x_squared( random_number )
{
	return Math.pow( random_number, 2 );
}

function technique_x_tesseracted( random_number )
{
	return Math.pow( random_number, 4 );
}

function initialize_buckets()
{
	buckets = new Array;
	var current_buckets_total = 0;
	for ( i = 0; i < number_of_buckets; i++ )
	{
		current_buckets_total += i;
		buckets[ i ] = current_buckets_total;
	}
}

function technique_buckets( random_number )
{
	for ( var current_bucket_index = 0; current_bucket_index < buckets.length; current_bucket_index++ )
	{
		if ( random_number <= buckets[ current_bucket_index ] )
		{
			return ( number_of_buckets - current_bucket_index - 1 ) / number_of_buckets;
		}
	}
}

/* -------------------- End Techniques -------------------- */


/* -------------------- Misc -------------------- */

function create_graph_divs( prefix )
{
	for ( var i = 0; i < 100; i++ )
	{
		document.write( '<div class="graph-row" id="' + prefix + 'graph-row-' + i + '"></div>' );
	}
}

/* -------------------- End Misc -------------------- */