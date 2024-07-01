"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonItemDropGrid = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	SmallItemGrid_1 = require("./SmallItemGrid/SmallItemGrid");
class CommonItemDropGrid extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.RIt = 0),
			(this.Mne = 0),
			(this.Count = 0),
			(this.$0t = void 0),
			(this.Wgt = void 0),
			(this.Xgt = void 0),
			(this.UIt = () => {
				this.Wgt && this.Wgt(this);
			});
	}
	Initialize(t) {
		this.CreateThenShowByActor(t);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UINiagara],
		]),
			(this.BtnBindInfo = [[0, this.UIt]]);
	}
	Refresh(t, e, i) {
		var r;
		t && (r = t[0]) && this.RefreshByItemInfo(r.ItemId, t[1], r.IncId);
	}
	RefreshByItemInfo(t, e, i) {
		(this.RIt = i),
			(this.Mne = t),
			(this.Count = e),
			(this.$0t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					this.Mne,
				)),
			this.$0t &&
				((t = {
					Type: 4,
					Data: [t, i],
					ItemConfigId: this.Mne,
					BottomText: 0 < e ? "" + e : "",
				}),
				this.Xgt.Apply(t),
				this.AIt(this.$0t.QualityId));
	}
	async AsyncRefreshByItemInfo(t, e, i) {
		if (
			((this.RIt = i),
			(this.Mne = t),
			(this.Count = e),
			(this.$0t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					this.Mne,
				)),
			this.$0t)
		) {
			const r = new CustomPromise_1.CustomPromise();
			(t = {
				Type: 4,
				Data: [t, i],
				ItemConfigId: this.Mne,
				BottomText: 0 < e ? "" + e : "",
			}),
				this.Xgt.Apply(t),
				this.AIt(this.$0t.QualityId, () => {
					r.SetResult();
				}),
				await r.Promise;
		}
	}
	AIt(t, e) {
		(t =
			ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(t)) &&
			((t = t.DropItemQualityNiagaraPath),
			StringUtils_1.StringUtils.IsEmpty(t) ||
				ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, (t) => {
					this.GetUiNiagara(2).SetNiagaraSystem(t), e && e();
				}));
	}
	Clear() {
		(this.$0t = void 0), (this.Wgt = void 0);
	}
	OnStart() {
		(this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
			this.Xgt.Initialize(this.GetItem(1).GetOwner());
	}
	GetUniqueId() {
		return this.RIt;
	}
	GetConfigId() {
		return this.Mne;
	}
	GetItemConfig() {
		return this.$0t;
	}
	BindOnClicked(t) {
		this.Wgt = t;
	}
}
exports.CommonItemDropGrid = CommonItemDropGrid;
