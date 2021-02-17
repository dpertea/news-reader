import { createMuiTheme } from '@material-ui/core/styles';
import bluegrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme( {
    palette: {
        primary: bluegrey,
        secondary: blue
    },
    typography: {
        fontFamily: [
            'Newsreader'
        ].join(','),
    },
    toggle: {
        thumbOnColor: 'rgba(0,50,120,.5)',
        trackOnColor: 'rgba(0,50,120,.5)'
    },
    states: {
        danger: red
    }
});

export default theme;
