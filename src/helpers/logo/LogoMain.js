import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoMain = () => {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="icon logo" width="100" />
     *
     */
    <>
      {/* <svg width="66" height="28" viewBox="0 0 66 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M52.7694 1.05138V7H51.6023V0.0922266H52.6774L52.7694 1.05138ZM56.1835 2.54084V2.63768C56.1835 3.00044 56.1383 3.33707 56.0479 3.64756C55.9608 3.95498 55.83 4.22398 55.6557 4.45455C55.4846 4.68204 55.2731 4.85881 55.0213 4.98485C54.7695 5.11089 54.4789 5.17391 54.1496 5.17391C53.8235 5.17391 53.5378 5.11704 53.2924 5.00329C53.0503 4.88647 52.8453 4.722 52.6774 4.50988C52.5095 4.29776 52.3739 4.04875 52.2706 3.76285C52.1705 3.47387 52.0995 3.15722 52.0575 2.81291V2.43939C52.0995 2.07356 52.1705 1.74155 52.2706 1.44335C52.3739 1.14515 52.5095 0.88845 52.6774 0.673254C52.8453 0.458059 53.0503 0.292051 53.2924 0.175231C53.5346 0.0584102 53.817 0 54.1399 0C54.4692 0 54.7614 0.0614844 55.0164 0.184453C55.2715 0.304348 55.4862 0.476504 55.6605 0.700922C55.8349 0.922266 55.9656 1.18972 56.0528 1.50329C56.14 1.81379 56.1835 2.15964 56.1835 2.54084ZM55.0164 2.63768V2.54084C55.0164 2.31028 54.9938 2.09662 54.9486 1.89987C54.9034 1.70004 54.8324 1.52481 54.7356 1.37418C54.6387 1.22354 54.5144 1.10672 54.3627 1.02372C54.2142 0.937637 54.035 0.894598 53.8251 0.894598C53.6185 0.894598 53.4409 0.928415 53.2924 0.996047C53.1439 1.06061 53.0196 1.1513 52.9195 1.26812C52.8194 1.38494 52.742 1.52174 52.6871 1.67852C52.6322 1.83224 52.5934 1.99978 52.5708 2.18116V3.07576C52.6096 3.2971 52.6758 3.5 52.7694 3.68445C52.863 3.86891 52.9954 4.01647 53.1665 4.12714C53.3408 4.23474 53.5636 4.28854 53.8348 4.28854C54.0447 4.28854 54.2238 4.2455 54.3723 4.15942C54.5209 4.07334 54.6419 3.95498 54.7356 3.80435C54.8324 3.65064 54.9034 3.47387 54.9486 3.27404C54.9938 3.07422 55.0164 2.8621 55.0164 2.63768Z"
          fill={theme.palette.primary.main}
        />
        <path
          d="M58.5466 1.04216V5.08169H57.3795V0.0922266H58.4933L58.5466 1.04216ZM60.1496 0.0599473L60.1399 1.09289C60.0688 1.08059 59.9914 1.07137 59.9074 1.06522C59.8267 1.05907 59.746 1.05599 59.6653 1.05599C59.4651 1.05599 59.2892 1.08366 59.1374 1.139C58.9857 1.19126 58.8582 1.26812 58.7548 1.36957C58.6548 1.46794 58.5773 1.58783 58.5224 1.72925C58.4675 1.87066 58.4352 2.02899 58.4255 2.20422L58.1592 2.22266C58.1592 1.90909 58.1915 1.61858 58.256 1.35112C58.3206 1.08366 58.4175 0.848485 58.5466 0.645586C58.679 0.442688 58.8436 0.284365 59.0406 0.170619C59.2407 0.0568731 59.4716 0 59.7331 0C59.8041 0 59.88 0.00614844 59.9607 0.0184453C60.0446 0.0307422 60.1076 0.0445762 60.1496 0.0599473Z"
          fill={theme.palette.primary.main}
        />
        <path
          d="M60.7305 2.64229V2.53623C60.7305 2.17655 60.7854 1.843 60.8951 1.53557C61.0049 1.22508 61.1631 0.956083 61.3697 0.72859C61.5796 0.498024 61.8346 0.319719 62.1349 0.193676C62.4384 0.0645586 62.7806 0 63.1615 0C63.5457 0 63.888 0.0645586 64.1882 0.193676C64.4917 0.319719 64.7484 0.498024 64.9582 0.72859C65.1681 0.956083 65.3279 1.22508 65.4376 1.53557C65.5474 1.843 65.6023 2.17655 65.6023 2.53623V2.64229C65.6023 3.00198 65.5474 3.33553 65.4376 3.64295C65.3279 3.95037 65.1681 4.21937 64.9582 4.44993C64.7484 4.67743 64.4933 4.85573 64.1931 4.98485C63.8928 5.11089 63.5522 5.17391 63.1712 5.17391C62.787 5.17391 62.4432 5.11089 62.1397 4.98485C61.8395 4.85573 61.5844 4.67743 61.3746 4.44993C61.1647 4.21937 61.0049 3.95037 60.8951 3.64295C60.7854 3.33553 60.7305 3.00198 60.7305 2.64229ZM61.8976 2.53623V2.64229C61.8976 2.86671 61.9218 3.07883 61.9702 3.27866C62.0187 3.47848 62.0945 3.65371 62.1978 3.80435C62.3012 3.95498 62.4335 4.07334 62.5949 4.15942C62.7564 4.2455 62.9485 4.28854 63.1712 4.28854C63.3875 4.28854 63.5748 4.2455 63.733 4.15942C63.8944 4.07334 64.0268 3.95498 64.1301 3.80435C64.2334 3.65371 64.3093 3.47848 64.3577 3.27866C64.4094 3.07883 64.4352 2.86671 64.4352 2.64229V2.53623C64.4352 2.31489 64.4094 2.10584 64.3577 1.90909C64.3093 1.70927 64.2318 1.5325 64.1253 1.37879C64.0219 1.22508 63.8896 1.10518 63.7282 1.0191C63.57 0.929952 63.3811 0.885375 63.1615 0.885375C62.942 0.885375 62.7515 0.929952 62.5901 1.0191C62.4319 1.10518 62.3012 1.22508 62.1978 1.37879C62.0945 1.5325 62.0187 1.70927 61.9702 1.90909C61.9218 2.10584 61.8976 2.31489 61.8976 2.53623Z"
          fill={theme.palette.primary.main}
        />
        <path
          d="M13.524 24.248H6.188L5.012 27.72H0L7.112 8.064H12.656L19.768 27.72H14.7L13.524 24.248ZM12.292 20.552L9.856 13.356L7.448 20.552H12.292Z"
          fill={theme.palette.primary.main}
        />
        <path
          d="M27.2805 14.308C27.7285 13.58 28.3725 12.992 29.2125 12.544C30.0525 12.096 31.0139 11.872 32.0965 11.872C33.3845 11.872 34.5512 12.1987 35.5965 12.852C36.6419 13.5053 37.4632 14.4387 38.0605 15.652C38.6765 16.8653 38.9845 18.2747 38.9845 19.88C38.9845 21.4853 38.6765 22.904 38.0605 24.136C37.4632 25.3493 36.6419 26.292 35.5965 26.964C34.5512 27.6173 33.3845 27.944 32.0965 27.944C30.9952 27.944 30.0339 27.7293 29.2125 27.3C28.3912 26.852 27.7472 26.264 27.2805 25.536V27.72H22.4925V7H27.2805V14.308ZM34.1125 19.88C34.1125 18.6853 33.7765 17.752 33.1045 17.08C32.4512 16.3893 31.6392 16.044 30.6685 16.044C29.7165 16.044 28.9045 16.3893 28.2325 17.08C27.5792 17.7707 27.2525 18.7133 27.2525 19.908C27.2525 21.1027 27.5792 22.0453 28.2325 22.736C28.9045 23.4267 29.7165 23.772 30.6685 23.772C31.6205 23.772 32.4325 23.4267 33.1045 22.736C33.7765 22.0267 34.1125 21.0747 34.1125 19.88Z"
          fill={theme.palette.primary.main}
        />
        <path d="M46.8444 7V27.72H42.0564V7H46.8444Z" fill={theme.palette.primary.main} />
        <path
          d="M65.6022 19.656C65.6022 20.104 65.5742 20.5707 65.5182 21.056H54.6822C54.7569 22.0267 55.0649 22.7733 55.6062 23.296C56.1662 23.8 56.8476 24.052 57.6502 24.052C58.8449 24.052 59.6756 23.548 60.1423 22.54H65.2383C64.9769 23.5667 64.5009 24.4907 63.8103 25.312C63.1383 26.1333 62.2889 26.7773 61.2622 27.244C60.2356 27.7107 59.0876 27.944 57.8182 27.944C56.2876 27.944 54.9249 27.6173 53.7302 26.964C52.5356 26.3107 51.6022 25.3773 50.9302 24.164C50.2582 22.9507 49.9222 21.532 49.9222 19.908C49.9222 18.284 50.2489 16.8653 50.9022 15.652C51.5742 14.4387 52.5076 13.5053 53.7022 12.852C54.8969 12.1987 56.2689 11.872 57.8182 11.872C59.3302 11.872 60.6743 12.1893 61.8503 12.824C63.0262 13.4587 63.9409 14.364 64.5943 15.54C65.2663 16.716 65.6022 18.088 65.6022 19.656ZM60.7022 18.396C60.7022 17.5747 60.4222 16.9213 59.8622 16.436C59.3022 15.9507 58.6022 15.708 57.7622 15.708C56.9596 15.708 56.2783 15.9413 55.7183 16.408C55.1769 16.8747 54.8409 17.5373 54.7102 18.396H60.7022Z"
          fill={theme.palette.primary.main}
        />
      </svg> */}
{/* "66" height="28"  */}
      <svg width="110" height="40" viewBox="0 0 315 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M313.455 42.9382C312.156 46.9313 309.822 50.0825 306.455 52.3918C303.087 54.701 299.046 55.8557 294.331 55.8557C290.963 55.8557 288.005 55.3024 285.455 54.1959C282.905 53.0412 280.764 51.5017 279.032 49.5773C277.3 47.6529 276.001 45.4399 275.135 42.9382C274.269 40.3883 273.836 37.7423 273.836 35C273.836 32.2577 274.269 29.6357 275.135 27.134C276.001 24.6323 277.276 22.4193 278.96 20.4949C280.692 18.5705 282.809 17.0309 285.31 15.8763C287.86 14.7217 290.819 14.1443 294.187 14.1443C297.218 14.1443 299.96 14.6735 302.413 15.732C304.915 16.7904 307.032 18.2337 308.764 20.0619C310.496 21.8419 311.819 23.9107 312.733 26.268C313.695 28.6254 314.176 31.1031 314.176 33.701C314.176 34.3746 314.128 35.0481 314.032 35.7217C313.984 36.3471 313.912 36.9966 313.815 37.6701H285.166C285.407 38.8248 285.791 39.9313 286.321 40.9897C286.898 42.0481 287.62 42.9863 288.486 43.8041C289.352 44.622 290.362 45.2715 291.517 45.7526C292.671 46.2337 293.994 46.4742 295.486 46.4742C296.977 46.4742 298.396 46.2096 299.743 45.6804C301.139 45.1031 302.197 44.189 302.919 42.9382H313.455ZM302.702 29.2268C302.173 27.6392 301.259 26.2921 299.96 25.1856C298.709 24.079 297.001 23.5258 294.836 23.5258C292.623 23.5258 290.795 24.079 289.352 25.1856C287.908 26.2921 286.826 27.6392 286.104 29.2268H302.702Z"
          fill="#1B1B1B"
        />
        <path
          d="M255.207 30.0928C256.506 30.4295 258.021 30.8385 259.753 31.3196C261.485 31.8007 263.121 32.4983 264.661 33.4124C266.248 34.3265 267.595 35.5533 268.702 37.0928C269.808 38.5842 270.362 40.5326 270.362 42.9381C270.362 45.1512 269.881 47.0997 268.918 48.7835C268.004 50.4192 266.777 51.7663 265.238 52.8247C263.747 53.8832 262.039 54.677 260.114 55.2062C258.19 55.7354 256.241 56 254.269 56C249.458 56 245.705 54.8694 243.011 52.6082C240.317 50.3471 238.777 47.2199 238.393 43.2268H247.774C247.966 44.8625 248.592 46.0172 249.65 46.6907C250.709 47.3161 252.32 47.6289 254.485 47.6289C256.025 47.6289 257.3 47.3643 258.31 46.835C259.32 46.2577 259.826 45.488 259.826 44.5258C259.826 43.1787 259.248 42.1924 258.094 41.567C256.939 40.9416 255.52 40.3883 253.836 39.9072C252.248 39.4261 250.564 38.945 248.784 38.4639C247.004 37.9347 245.369 37.2131 243.877 36.299C242.386 35.3849 241.135 34.2062 240.125 32.7629C239.162 31.2715 238.681 29.3471 238.681 26.9897C238.681 24.7766 239.114 22.8763 239.98 21.2886C240.894 19.6529 242.073 18.3058 243.516 17.2474C245.008 16.1409 246.692 15.323 248.568 14.7938C250.444 14.2646 252.369 14 254.341 14C256.987 14 259.224 14.3368 261.052 15.0103C262.881 15.6838 264.372 16.622 265.527 17.8247C266.729 18.9794 267.619 20.3264 268.197 21.866C268.774 23.4055 269.111 25.0412 269.207 26.7732H259.97C259.826 25.2337 259.272 24.1271 258.31 23.4536C257.396 22.7319 256.025 22.3711 254.197 22.3711C252.753 22.3711 251.551 22.6598 250.588 23.2371C249.674 23.8144 249.217 24.5601 249.217 25.4742C249.217 26.677 249.795 27.6392 250.949 28.3608C252.104 29.0344 253.523 29.6117 255.207 30.0928Z"
          fill="#1B1B1B"
        />
        <path
          d="M234.519 54.701H223.767L222.468 50.8763H222.251C220.712 52.4158 218.931 53.6426 216.911 54.5567C214.89 55.4227 212.725 55.8557 210.416 55.8557C208.251 55.8557 206.206 55.4948 204.282 54.7732C202.358 54.0515 200.674 53.0893 199.23 51.8866C197.787 50.6357 196.657 49.1924 195.839 47.5567C195.021 45.8728 194.684 44.0928 194.828 42.2165C195.021 39.7148 195.646 37.7182 196.705 36.2268C197.811 34.6873 199.158 33.4845 200.746 32.6185C202.334 31.7526 204.09 31.1271 206.014 30.7423C207.986 30.3574 209.959 30.0687 211.932 29.8763C213.904 29.6357 215.756 29.3952 217.488 29.1546C219.268 28.866 220.784 28.4089 222.035 27.7835C221.65 25.7629 220.928 24.1993 219.87 23.0928C218.859 21.9862 217.248 21.433 215.035 21.433C213.447 21.433 212.028 21.89 210.777 22.8041C209.526 23.7182 208.901 25.2337 208.901 27.3505H198.148C198.244 25.4742 198.701 23.7182 199.519 22.0825C200.337 20.4467 201.468 19.0515 202.911 17.8969C204.402 16.6941 206.158 15.756 208.179 15.0825C210.248 14.3608 212.533 14 215.035 14C218.643 14 221.626 14.4811 223.983 15.4433C226.389 16.4055 228.289 17.7285 229.684 19.4124C231.127 21.0481 232.114 22.9725 232.643 25.1856C233.22 27.3986 233.509 29.7801 233.509 32.3299V50.8763L234.519 54.701ZM222.468 34.2783C220.88 34.7113 219.148 35.0722 217.272 35.3608C215.444 35.6014 213.712 35.9141 212.076 36.299C210.488 36.6838 209.117 37.2612 207.962 38.0309C206.856 38.8007 206.23 39.9072 206.086 41.3505C205.99 42.1684 206.134 42.9141 206.519 43.5876C206.904 44.2131 207.433 44.7423 208.107 45.1753C208.78 45.6082 209.55 45.945 210.416 46.1856C211.282 46.378 212.148 46.4742 213.014 46.4742C214.842 46.4742 216.358 46.2096 217.56 45.6804C218.763 45.1031 219.725 44.3574 220.447 43.4433C221.169 42.5292 221.674 41.4467 221.962 40.1959C222.299 38.945 222.468 37.646 222.468 36.299V34.2783Z"
          fill="#1B1B1B"
        />
        <path
          d="M172.963 46.4742C175.273 46.4742 177.221 45.8247 178.809 44.5258C180.444 43.1787 181.431 41.4708 181.767 39.4021H191.798C191.702 41.8557 191.173 44.0928 190.211 46.1134C189.297 48.134 188.022 49.866 186.386 51.3093C184.75 52.7526 182.778 53.8832 180.468 54.701C178.207 55.4708 175.706 55.8557 172.963 55.8557C169.596 55.8557 166.637 55.2543 164.087 54.0515C161.585 52.8488 159.517 51.2612 157.881 49.2887C156.245 47.268 155.018 44.9828 154.2 42.433C153.383 39.835 152.974 37.1649 152.974 34.4227C152.974 31.6804 153.407 29.0825 154.273 26.6289C155.187 24.1752 156.51 22.0103 158.242 20.134C159.974 18.2577 162.09 16.7663 164.592 15.6598C167.142 14.5533 170.053 14 173.324 14C175.826 14 178.183 14.3849 180.396 15.1546C182.657 15.8763 184.606 16.9347 186.242 18.3299C187.926 19.677 189.249 21.3127 190.211 23.2371C191.221 25.1615 191.75 27.2783 191.798 29.5876H181.623C181.238 27.8075 180.396 26.3642 179.097 25.2577C177.846 24.1031 176.187 23.5258 174.118 23.5258C172.386 23.5258 170.871 23.8866 169.572 24.6082C168.321 25.2818 167.286 26.1718 166.468 27.2783C165.651 28.3368 165.025 29.5636 164.592 30.9587C164.207 32.3058 164.015 33.6529 164.015 35C164.015 36.2027 164.159 37.4777 164.448 38.8247C164.785 40.1718 165.29 41.4227 165.963 42.5773C166.685 43.6838 167.623 44.622 168.778 45.3917C169.932 46.1134 171.328 46.4742 172.963 46.4742Z"
          fill="#1B1B1B"
        />
        <path
          d="M125.111 15.299H131.751V3.24741H142.647V15.299H150.225V23.6701H142.647V41.2784C142.647 42.6254 142.864 43.8041 143.297 44.8144C143.73 45.8247 144.716 46.3299 146.256 46.3299H150.369V54.701H142.647C140.579 54.701 138.847 54.4605 137.452 53.9794C136.056 53.4983 134.926 52.8007 134.06 51.8866C133.242 50.9725 132.641 49.89 132.256 48.6392C131.919 47.3402 131.751 45.8729 131.751 44.2371V23.6701H125.111V15.299Z"
          fill="#1B1B1B"
        />
        <path d="M110.304 54.701V0H121.201V54.701H110.304Z" fill="#1B1B1B" />
        <path
          d="M105.059 54.701H94.3066L93.0076 50.8763H92.7911C91.2516 52.4158 89.4715 53.6426 87.4509 54.5567C85.4303 55.4227 83.2653 55.8557 80.956 55.8557C78.7911 55.8557 76.7464 55.4948 74.822 54.7732C72.8976 54.0515 71.2138 53.0893 69.7705 51.8866C68.3272 50.6357 67.1966 49.1924 66.3787 47.5567C65.5609 45.8728 65.2241 44.0928 65.3684 42.2165C65.5609 39.7148 66.1863 37.7182 67.2447 36.2268C68.3512 34.6873 69.6983 33.4845 71.2859 32.6185C72.8736 31.7526 74.6296 31.1271 76.554 30.7423C78.5265 30.3574 80.499 30.0687 82.4715 29.8763C84.444 29.6357 86.2962 29.3952 88.0282 29.1546C89.8083 28.866 91.3237 28.4089 92.5746 27.7835C92.1897 25.7629 91.4681 24.1993 90.4097 23.0928C89.3993 21.9862 87.7877 21.433 85.5746 21.433C83.987 21.433 82.5677 21.89 81.3169 22.8041C80.066 23.7182 79.4406 25.2337 79.4406 27.3505H68.688C68.7842 25.4742 69.2413 23.7182 70.0591 22.0825C70.877 20.4467 72.0076 19.0515 73.4509 17.8969C74.9423 16.6941 76.6983 15.756 78.7189 15.0825C80.7877 14.3608 83.0729 14 85.5746 14C89.1828 14 92.1657 14.4811 94.5231 15.4433C96.9286 16.4055 98.8289 17.7285 100.224 19.4124C101.667 21.0481 102.654 22.9725 103.183 25.1856C103.76 27.3986 104.049 29.7801 104.049 32.3299V50.8763L105.059 54.701ZM93.0076 34.2783C91.42 34.7113 89.688 35.0722 87.8117 35.3608C85.9835 35.6014 84.2516 35.9141 82.6158 36.299C81.0282 36.6838 79.6571 37.2612 78.5024 38.0309C77.3959 38.8007 76.7705 39.9072 76.6261 41.3505C76.5299 42.1684 76.6743 42.9141 77.0591 43.5876C77.444 44.2131 77.9732 44.7423 78.6468 45.1753C79.3203 45.6082 80.0901 45.945 80.956 46.1856C81.822 46.378 82.688 46.4742 83.554 46.4742C85.3822 46.4742 86.8976 46.2096 88.1004 45.6804C89.3031 45.1031 90.2653 44.3574 90.987 43.4433C91.7086 42.5292 92.2138 41.4467 92.5024 40.1959C92.8392 38.945 93.0076 37.646 93.0076 36.299V34.2783Z"
          fill="#1B1B1B"
        />
        <path d="M10.9558 55.9968L0 56L42.1213 0H53.1358L10.9558 55.9968Z" fill="#21B546" />
        <path d="M38.4727 32.9389L21.3838 55.9969H55.835L38.4727 32.9389Z" fill="#21B546" />
      </svg>
    </>
  );
};

LogoMain.propTypes = {
  reverse: PropTypes.bool
};

export default LogoMain;
