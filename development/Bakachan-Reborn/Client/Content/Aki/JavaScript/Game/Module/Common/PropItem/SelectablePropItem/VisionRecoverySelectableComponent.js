"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecoverySelectableComponent = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	SelectableComponent_1 = require("./SelectableComponent"),
	SelectablePropVisionRecoveryItemGrid_1 = require("./SelectablePropVisionRecoveryItemGrid");
class VisionRecoverySelectableComponent extends SelectableComponent_1.SelectableComponent {
	constructor() {
		super(...arguments),
			(this.InitItem = () => {
				var e =
					new SelectablePropVisionRecoveryItemGrid_1.SelectablePropVisionRecoveryItemGrid();
				return (
					e.BindLongPress(1, this.AddFunction, this.CanItemLongPress),
					e.BindReduceLongPress(this.ReduceFunction),
					e.BindAfterApply(this.OnAfterApplyMediumItemGrid),
					e.BindOnCanExecuteChange(this.OnCanExecuteChange),
					e
				);
			});
	}
	CanAddMaterial(e, t = !1) {
		var o;
		return 0 <
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
				e.IncId,
			).GetPhantomLevel()
			? (t &&
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"Text_EchoFull_Text",
					),
				!1)
			: e.GetIsLock()
				? (t &&
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"WeaponLockTipsText",
						),
					!1)
				: !(
						((o = this.GetSelectedData(e))?.SelectedCount &&
							o.SelectedCount === e.Count) ||
						(!o && this.SelectedDataList.length >= this.MaxSize
							? (t &&
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"Text_EchoLimit_Text",
									),
								1)
							: this.Data.CheckIfCanAddFunction &&
								!this.Data.CheckIfCanAddFunction(
									this.SelectedDataList,
									e.IncId,
									e.ItemId,
									1,
								))
					);
	}
}
exports.VisionRecoverySelectableComponent = VisionRecoverySelectableComponent;
