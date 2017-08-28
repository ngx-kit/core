export type KitCoreOverlayContainerPosition =
    KitCoreOverlayContainerPositionSide
    | KitCoreOverlayContainerPositionCorner;
export type KitCoreOverlayContainerPositionSide = 'top' | 'right' | 'bottom' | 'left';
export type KitCoreOverlayContainerPositionCorner = 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
export type KitCoreOverlayContainerWidthType = 'auto' | 'full';
export type KitCoreOverlayContainerType = 'dropdown' | 'side' | 'center' | 'fixedSide';

export interface KitCoreOverlayComponent {
  cdrCheck(): void;
}
