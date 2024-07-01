"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CustomMarkItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	CustomMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/CustomMarkByMarkId"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	MapUtil_1 = require("../../MapUtil"),
	CustomMarkItemView_1 = require("../MarkItemView/CustomMarkItemView"),
	ServerMarkItem_1 = require("./ServerMarkItem");
class CustomMarkItem extends ServerMarkItem_1.ServerMarkItem {
	constructor(e, r, t, a) {
		super(e, r, t, a), (this.NLi = !1);
	}
	get MarkType() {
		return 9;
	}
	get IsNewCustomMarkItem() {
		return this.NLi;
	}
	Initialize() {
		super.Initialize();
		var e = this.ServerMarkInfo,
			r =
				(e.TrackTarget instanceof Vector_1.Vector
					? ((r = Vector_1.Vector.Create(
							e.TrackTarget.X,
							-e.TrackTarget.Y,
							e.TrackTarget.Z,
						)),
						(r = MapUtil_1.MapUtil.UiPosition2WorldPosition(r, r)),
						this.SetTrackData(r),
						this.h$s())
					: e.TrackTarget instanceof Vector2D_1.Vector2D
						? ((r = Vector_1.Vector.Create(
								e.TrackTarget.X,
								e.TrackTarget.Y,
								0,
							)),
							(e = MapUtil_1.MapUtil.UiPosition2WorldPosition(r, r)),
							this.SetTrackData(new Vector2D_1.Vector2D(e.X, e.Y)))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Map", 50, "未定义的类型"),
				this.SetConfigId(this.ConfigId),
				CustomMarkByMarkId_1.configCustomMarkByMarkId.GetConfig(this.ConfigId));
		(this.ShowPriority = r ? r.ShowPriority : 0), this.UpdateTrackState();
	}
	h$s() {
		var e,
			r = this.ServerMarkInfo;
		r.TrackTarget instanceof Vector_1.Vector &&
			((e = this.UiPosition).X <= -2600 ||
				4200 <= e.X ||
				e.Y <= -4200 ||
				2e3 <= e.Y) &&
			((e = r.TrackTarget),
			this.UpdateCustomMapMarkPosition(Vector_1.Vector.Create(e.X, -e.Y, 0)));
	}
	OnCreateView() {
		this.InnerView = new CustomMarkItemView_1.CustomMarkItemView(this);
	}
	SetConfigId(e) {
		(this.ServerMarkInfo.MarkConfigId = e), this.OnSetConfigId(e);
	}
	OnSetConfigId(e) {
		(e = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(e)),
			this.OnAfterSetConfigId(e);
	}
	SetIsNew(e) {
		this.NLi = e;
	}
	GetTitleText() {
		return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
			"CustomMarkName",
		);
	}
	CheckCanShowView() {
		return 1 === this.MapType
			? !ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks
			: !ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks &&
					super.CheckCanShowView();
	}
}
exports.CustomMarkItem = CustomMarkItem;
