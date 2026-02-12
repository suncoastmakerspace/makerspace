
// Importing Swing components for building the graphical user interface (GUI)
import javax.swing.*;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

//Importing AWT classes for graphics, layout, colors, and event handling
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;

//Importing utility classes for collections and functional programming
import java.util.*;
import java.util.List;
import java.util.function.Function;

/**
 * Graphing Calculator with as simple as possible structure
 *
 * Notes:
 * - Zero points (x-intercepts) persist on screen
 * - Grid labels are cleaned and formatted
 * - Default window size: 800x600
 * - Default grid spacing: 1 unit
 * - No keyboard shortcuts currently
 * - Please annotate the code
 */

public class GraphingCalculator extends JFrame {
    // UI Components
	
    // Input field where the user types a mathematical function (e.g., x^2 + 3x - 5)
	private final JTextField functionInputField = new JTextField();
    
    // Input field where the user can enter a specific x-value to evaluate the function
	private final JTextField xValueInput = new JTextField(8);
    
    // Displays the computed y-value for the given x-value
	private final JLabel yValueOutput = new JLabel("y = ?");
    
    // Displays live mouse coordinates while hovering over the graph
	private final JLabel coordinatesLabel = new JLabel(" ");
    
    // Displays error messages (e.g., invalid function syntax)
	private final JLabel warningLabel = new JLabel(" ");
    
    // Displays helpful suggestions (e.g., format hints for functions)
	private final JLabel suggestionLabel = new JLabel(" ");
    
    // Graph state
    
    // Stores the currently active mathematical expression as a string
    // This is updated whenever the user changes the function input
	private String currentExpression = "";
    
    // Stores detected x-intercepts (zero-crossing points) of the function
    // These are calculated during graph rendering
	private final List<ZeroPoint> zeroCrossingPoints = new ArrayList<>();
    
    // Tracks how much the graph has been panned (dragged) horizontally and vertically
	private int panOffsetX = 0, panOffsetY = 0;
    
    // Stores the last mouse position during dragging to calculate movement delta
	private Point lastDragPoint;
    
    // Controls the zoom level:
    // Defines how many pixels represent one unit on the graph
    // Higher value = zoomed in, lower value = zoomed out
	private double pixelsPerUnit = 50; // I can say this is pretty comfortable
    
    // Colors
    
    // Color used to display error messages
	private final Color WARNING_COLOR = new Color(200, 0, 0);
    
    // Color used to display helpful suggestions
	private final Color SUGGESTION_COLOR = new Color(0, 100, 0);
    
    // Default text color
	private final Color NORMAL_COLOR = Color.BLACK;

    /**
     * Represents a zero crossing point in mathematical coordinates.
     * 
     * A zero crossing point is where the function intersects the x-axis (y = 0).
     * These are stored in mathematical coordinate space, NOT pixel space.
     */
	private static class ZeroPoint {
    	
    	//x-coord
		public final double x;
        
    //y-coord
		public final double y;
		
        /**
         * Constructor for creating a ZeroPoint.
         * 
         * @param x Mathematical x-value
         * @param y Mathematical y-value
         */
        
		public ZeroPoint(double x, double y) {
			this.x = x;
			this.y = y;
		}
        
        /**
         * Converts this mathematical coordinate into a pixel coordinate
         * so it can be drawn on the screen.
         *
         * @param width   Width of the drawing area
         * @param height  Height of the drawing area
         * @param scale   Pixels per unit (zoom level)
         * @param offsetX Horizontal pan offset
         * @param offsetY Vertical pan offset
         * @return        Corresponding pixel position
         */
		
		public Point toPixel(int width, int height, double scale, int offsetX, int offsetY) {
            // Convert mathematical x to screen x
			int px = (int) (width / 2.0 + x * scale + offsetX);
			
            // Convert mathematical y to screen y
            // Note: y is inverted because screen coordinates increase downward
			int py = (int) (height / 2.0 - y * scale - offsetY);
			
			return new Point(px, py);
			
		}
		
	}

    /**
     * Constructor for the GraphingCalculator.
     * 
     * Sets up the UI and registers all event handlers.
     */
	
	public GraphingCalculator() {
		initializeUI();			//Builds and lays out all interface components
		setupEventHandlers();	//Attaches listeners for buttons, mouse, and more
	}

    /**
     * Initializes main window properties and builds layout structure.
     */
	private void initializeUI() {
		
		setTitle("Graphing Calculator");			//The pop-up title
		setSize(1200, 800); 						//Default window size
		setDefaultCloseOperation(EXIT_ON_CLOSE); //Properly exits program when closed
		setLocationRelativeTo(null);				//Centers window on screen
		setLayout(new BorderLayout());			//Main layout manager

		//Build UI sections
		createTopPanel();
		createCenterPanel();
		createBottomPanel();
    }

