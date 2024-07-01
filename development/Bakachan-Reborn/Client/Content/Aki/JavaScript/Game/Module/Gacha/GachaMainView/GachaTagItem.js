"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaTagItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class GachaTagItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.SelectCallback = void 0),
			(this.CanExecuteChange = void 0),
			(this.ujt = () => {
				this.SelectCallback?.(this.GridIndex);
			});
	}
	get GachaId() {
		return this.Data.GachaInfo.Id;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[3, UE.UIExtendToggle],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.ujt]]);
	}
	OnStart() {
		this.GetExtendToggle(3).CanExecuteChange.Bind(
			() => !this.CanExecuteChange || this.CanExecuteChange(this.GridIndex),
		);
	}
	SetSelected(e) {
		e
			? this.GetExtendToggle(3).SetToggleState(1)
			: this.GetExtendToggle(3).SetToggleState(0);
	}
	RefreshRedDot() {
		this.GetItem(2)?.SetUIActive(
			ModelManager_1.ModelManager.GachaModel.CheckNewGachaPoolById(
				this.GachaId,
			),
		);
	}
	InitData() {
		var e, t;
		this.Data &&
			((e = this.Data.PoolInfo.Id),
			(e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e))
				? (this.SetSpriteByPath(
						e.TagNotSelectedSpritePath,
						this.GetSprite(0),
						!1,
					),
					this.SetSpriteByPath(e.TagSelectedSpritePath, this.GetSprite(1), !1),
					this.GetItem(4).SetUIActive(!0),
					(e = e.Type),
					(t = (e =
						ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(e))
						.TagText) && !StringUtils_1.StringUtils.IsBlank(t)
						? (this.GetItem(4).SetUIActive(!0),
							LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.TagText),
							(t = UE.Color.FromHex(e.TagColor)),
							this.GetSprite(5).SetColor(t))
						: this.GetItem(4).SetUIActive(!1))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Gacha",
						35,
						"获取抽卡界面信息失败，请检查GachaViewInfo表，GachaId:" +
							this.GachaId,
					));
	}
	Refresh(e, t, a) {
		(this.Data = e),
			this.InitData(),
			this.RefreshRedDot(),
			t ? this.OnSelected(!1) : this.OnDeselected(!1);
	}
	GetKey(e, t) {
		return this.GachaId;
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
}
exports.GachaTagItem = GachaTagItem;
