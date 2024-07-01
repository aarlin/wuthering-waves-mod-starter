"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioVisualizationManager = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class AudioVisualizationManager {
	constructor() {
		(this.GlobalConfig = void 0),
			(this.MaterialParametersCollectionFile = void 0),
			(this.InstanceActors = void 0);
	}
	static Get() {
		return (
			this.Ysr ||
				((this.Ysr = new AudioVisualizationManager()), this.Ysr.Initialize()),
			this.Ysr
		);
	}
	LoadAssets() {
		ResourceSystem_1.ResourceSystem.LoadAsync(
			"/Game/Aki/Audio/AudioVisualization/Data/DA_AudioVisualizationGlobalConfigs.DA_AudioVisualizationGlobalConfigs",
			UE.PDA_AudioVisualizationGlobalConfigs_C,
			(i, o) => {
				i?.IsValid()
					? ((this.GlobalConfig = i),
						(this.MaterialParametersCollectionFile = i.MPCFile),
						this.MaterialParametersCollectionFile?.IsValid() ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Render", 26, "音频可视化缺失MPC文件")))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Render", 26, "音频可视化未找到全局配置文件", [
							"path",
							"/Game/Aki/Audio/AudioVisualization/Data/DA_AudioVisualizationGlobalConfigs.DA_AudioVisualizationGlobalConfigs",
						]);
			},
		);
	}
	Initialize() {
		(this.InstanceActors = new Map()), this.LoadAssets();
	}
	Register(i) {
		this.InstanceActors.set(i.Identifier, i),
			(i.ActorEndPlayCallback = (i) => {
				this.Unregister(i);
			}),
			i.Start();
	}
	Unregister(i) {
		this.InstanceActors.delete(i.Identifier), i.End();
	}
	NotifyCallBackToAll(i, o, e) {
		this.InstanceActors.forEach((a) => {
			a.CallBack(i, o, e);
		});
	}
	Tick(i) {}
}
((exports.AudioVisualizationManager = AudioVisualizationManager).Ysr = void 0),
	(AudioVisualizationManager.xW = void 0);
