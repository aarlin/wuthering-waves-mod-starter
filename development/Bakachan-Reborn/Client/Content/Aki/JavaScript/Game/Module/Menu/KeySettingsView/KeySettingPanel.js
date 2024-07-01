"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeySettingPanel = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
	KeySettingRowBaseItem_1 = require("./KeySettingRowBaseItem"),
	KeySettingRowContainerItem_1 = require("./KeySettingRowContainerItem");
class KeySettingPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.MAi = void 0),
			(this.SAi = void 0),
			(this.EAi = void 0),
			(this.t_i = void 0),
			(this.i_i = void 0),
			(this.yAi = void 0),
			(this.IAi = void 0),
			(this.TAi = []),
			(this.LSi = (i, e, t) => {
				var n = new KeySettingRowContainerItem_1.KeySettingRowContainerItem();
				return (
					n.BindOnToggleStateChanged(this.s_i),
					n.BindOnHover(this.__i),
					n.BindOnUnHover(this.u_i),
					n.BindOnWaitInput(this.LAi),
					n
				);
			}),
			(this.s_i = (i, e) => {
				0 === e
					? (i.SetDetailItemVisible(!1), (this.yAi = void 0))
					: (this.yAi?.SetDetailItemVisible(!1),
						(this.yAi = i),
						this.yAi.SetDetailItemVisible(!0));
			}),
			(this.__i = (i) => {
				this.t_i && this.t_i(i);
			}),
			(this.u_i = (i) => {
				this.i_i && this.i_i(i);
			}),
			(this.LAi = (i, e, t) => {
				this.EAi && this.EAi(i, e, t);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIDynScrollViewComponent],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.SAi = new KeySettingRowBaseItem_1.KeySettingRowBaseItem()),
			(this.MAi = new DynScrollView_1.DynamicScrollView(
				this.GetUIDynScrollViewComponent(0),
				this.GetItem(1),
				this.SAi,
				this.LSi,
			)),
			await this.MAi.Init();
	}
	OnBeforeDestroy() {
		(this.SAi = void 0),
			(this.MAi = void 0),
			(this.yAi = void 0),
			(this.IAi = void 0),
			(this.EAi = void 0);
	}
	SelectKeySettingRow(i) {
		this.IAi?.SetSelected(!1), (this.IAi = i), this.IAi?.SetSelected(!0);
	}
	BindOnWaitInput(i) {
		this.EAi = i;
	}
	BindOnHover(i) {
		this.t_i = i;
	}
	BindOnUnHover(i) {
		this.i_i = i;
	}
	Refresh(i, e) {
		for (const e of i) e.IsExpandDetail = !1;
		(ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType = e),
			this.MAi?.RefreshByData(i),
			(this.TAi = i),
			(this.yAi = void 0);
	}
	RefreshRow(i) {
		var e = this.TAi.indexOf(i);
		this.MAi?.GetScrollItemFromIndex(e)?.Update(i, e);
	}
	StopScroll() {
		this.GetUIDynScrollViewComponent(0).StopMovement();
	}
}
exports.KeySettingPanel = KeySettingPanel;
